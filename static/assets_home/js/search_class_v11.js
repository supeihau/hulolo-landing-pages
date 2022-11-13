let callback = function(){
    let search_item = $("#search_item").val();
    let l_advanceds = [];
    let csrf = $("input[name=csrfmiddlewaretoken]:first").val();
    $.each($('input[name="advanced_type"]:checked'),function(){
      let value = $(this).val()
      l_advanceds.push(value)
    })
    
    $.ajax({
      url :'/search/results_post',
      type : 'post',
      data : {
        search_item : search_item,
        csrfmiddlewaretoken : csrf,
        l_advanced : l_advanceds
      },
  success : function(response){ //添加新行(column)顯示新樣本結果
    if (response.CheckCode == 1){
    let data = JSON.parse(response.ReplyContents)
    $('.col-lg-6').remove()
          for (let i = 0; i < data.length; i++) {
      let recommed = '???'
      let course_type = data[i]['fields']['course_type']
      switch (data[i]['fields']['recommed']) {
        case 1: {
          recommed = '⭐'
          break;
        }
        case 2: {
          recommed = '⭐⭐'
          break;
        }
        case 3: {
          recommed = '⭐⭐⭐'
          break;
        }
        case 4: {
          recommed = '⭐⭐⭐⭐'
          break;
        }          
        default: {
          recommed = '????'
        break;     
        }   
      }
      switch (course_type) {
        case 'Biology': {
          course_type = '生物'
          break;
        }
        case 'General': {
          course_type = '通識'
          break;
        }
        case 'Education': {
          course_type = '教程'
          break;
        }
        case 'PE_Sophomore': {
          course_type = '大二體育'
          break;
        }
        case 'PE_Junior_Senior': {
          course_type = '大三、四體育'
          break;
        }
        case 'Foreign_language': {
          course_type = '精進中/英外文'
          break;
        }
        case 'Military_training': {
          course_type = '軍訓'
          break;
        }
        case 'Others': {
          course_type = ''
          break;
        }
        default: {
          course_type = 'ERROR'
        break;     
        }   
      }
      content = data[i]['fields']['content']

      let replaced_way = content.search(/上課方式[：|:]|上課方式\s[：|:]/gm) >= 0;
        if(replaced_way){
          content = content.replace(/上課內容[：|:]|上課內容\s[：|:]/gm, 
          `
          </p>
          </div>
          <div class="mt-1">
              <p class="mb-0 d-inline fw-bolder brown">🥐 上課內容：</p>
              <p class="sm-scroll">`
          )}
        else{
          content = content.replace(/上課內容[：|:]|上課內容\s[：|:]/gm, 
          `<div class="mt-2">
          <p class="mb-0 d-inline fw-bolder brown">🥐 上課內容：</p>
            <p class="sm-scroll">`
        )}

      content = content.replace(/上課方式[：|:]|上課方式\s[：|:]/gm, 
      `<div class="mt-2">
      <p class="mb-0 d-inline fw-bolder brown">🥐 上課方式：</p>
        <p class="sm-scroll">`)


      content = content.replace(/點名頻率[：|:]|點名頻率\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 點名頻率：</p>
          <p class="sm-scroll">`)
      content = content.replace(/分數甜度\/評分標準[：|:]|分數甜度\/評分標準\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 分數甜度/評分標準：</p>
          <p class="md-scroll">`)
      content = content.replace(/考試方式與內容[：|:]|考試方式與內容\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 考試方式與內容：</p>
          <p class="lg-scroll">`)
      content = content.replace(/收穫[：|:]|收穫\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 收穫：</p>
          <p class="lg-scroll">`)
      content = content.replace(/加簽方式[：|:]|加簽方式\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 加簽方式：</p>
          <p class="sm-scroll">`)
      content = content.replace(/其他意見[：|:]|其他意見\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 其他意見：</p>
          <p class="lg-scroll">`)
      content = content.replace(/想對有興趣的外系同學說[：|:]|想對有興趣的外系同學說\s[：|:]/gm, 
      `
      </p>
      </div>
      <div class="mt-1">
          <p class="mb-0 d-inline fw-bolder brown">🥐 想對有興趣的外系同學說：</p>
          <p class="lg-scroll">`)
      content = content.replace(/\r\n/g, "<br>")
      content = content.replace(/scroll"> <br>|scroll"><br>/gm, `scroll">`)
      content = content.replace(`
      <br><br></p>
      </div>
      <div class="mt-1">
      `,
      `
      </p>
      </div>
      <div class="mt-1">
      `)
      
      if (data[i]['fields']['department_name'] === null){
        department_name = ''
      }
      else {
        department_name = data[i]['fields']['department_name']
      }

      let table_html = `
      <div class=" mb-4 col-lg-6 col-md-6 mt-4 mt-lg-0">
      <div class="box">
          <div class="header p-md-1 p-lg-2">
              <div class="icon pt-1 mb-1">${recommed}</div>
              <h4 class="title mt-1 mb-1 blue">${data[i]['fields']['semester']} ${course_type} ${department_name} #${data[i]['pk']}</h4>
              <h4 class="title pb-1 mt-1 mb-0">${data[i]['fields']['course_name']}-${data[i]['fields']['teacher_name']}</h4>
          </div>
          <div class="description content ps-4 pe-4 pb-3 mb-0">                                        
              ${content}
              </p>
              </div>
          </div>
          <p class="footer p-md-1 p-lg-2 description">
              投稿者 : ${data[i]['fields']['submit_name']}
          </p>
      </div>
  </div>
  `

      $('.result').append(table_html)
     

    }
  }

  else if (response.CheckCode == 5){
    $('#modal_no_register').modal('show')
  }
  else if (response.CheckCode == 0){
    $('#search_fail_title').text("未付費或尚未開放新生查詢")
    $('#search_fail_msg').text('大一免費，開放時間詳見粉絲專頁。')
    $('#modal_search_fail').modal('show')
  }

  else if (response.CheckCode == 2){
    $('#search_fail_title').text("無此課或老師評價，可能尚未收錄")
    $('#search_fail_msg').text('')
    $('#modal_search_fail').modal('show')
  }
  else if (response.CheckCode == 201){
    $('#search_fail_title').text("進階搜尋結果中，無此課或老師評價")
    $('#search_fail_msg').text('建議重新確認篩選條件')
    $('#modal_search_fail').modal('show')
  }  


          }
      
          });
    
  }
  $('#search').click(function(){
    if  ($("#search_item").val()){
      callback()
    }
  })

