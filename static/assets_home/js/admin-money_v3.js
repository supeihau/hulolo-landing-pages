var callback = function(){
    let search_item = $("#search_item").val();
    let csrf = $("input[name=csrfmiddlewaretoken]:first").val();
    $.ajax({
      url :'/admin-money/admin_money_post',
      type : 'post',
      data : {
        studentID : search_item,
        csrfmiddlewaretoken : csrf
      },
  success : function(response){ //添加新行(column)顯示新樣本結果
    if (response.checkcode==1){
      // $('.give_msg').remove()
      let table_html = '<div class=" mb-4 col-lg-6 col-md-6 mt-4 mt-lg-0"><div class="icon-box"><div class="icon">' + response.student_id +'</div>'
      table_html += '</div>'
      table_html = '<div class="alert alert-success align-items-center" role="alert">'
      table_html += '<div><b>' + response.student_id + '</b>  ' +  response.msg + '<br>' + response.time
      table_html += '</div></div>'
      $('.give_msg').prepend(table_html)
      $('#search_item').val("").focus();
    }
    else if (response.checkcode==0){ 
      let table_html = '<div class=" mb-4 col-lg-6 col-md-6 mt-4 mt-lg-0"><div class="icon-box"><div class="icon">' + response.student_id +'</div>'
      table_html += '</div>'
      table_html = '<div class="alert alert-danger align-items-center" role="alert">'
      table_html += '<div><b>' + response.student_id + '</b>  ' +  response.msg + '<br>' + response.time
      table_html += '</div></div>'
      $('.give_msg').prepend(table_html)
      $('#search_item').val("").focus();
    } 
          }
      
          });
    
  }
  


  // $('#search').click(callback);
  $('#search').click(function(){
    if  ($("#search_item").val()){
      callback()
    }
  })
  $('#search_item').on("keydown", function(e) {
    var code = e.keyCode || e.which;

    if ( code == 13 || code == 9 ) {
      if  ($("#search_item").val()){
        e.preventDefault();
        callback()
        return false;
      }
    }
  });