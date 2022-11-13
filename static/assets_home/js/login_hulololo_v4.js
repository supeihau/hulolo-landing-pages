var onloadCallback = function() {
    grecaptcha.render('submit', {
        'sitekey' : '6LfSwCEeAAAAAFki23Pbmh2oU_7UYynT1neH8BfE',
        'callback' : onSubmit
    });   
};

var onSubmit = function(token) {
                           
    let user_uid_val = $('input[name=user_uid]').val()
    let csrf = $("input[name=csrfmiddlewaretoken]").val()
    let testmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/

    let user_studentID_val = $('input[name=user_studentID]').val()
    let user_email_val = $('input[name=user_email]').val()
    if (user_studentID_val.length !=8){
        alert('輸入錯誤，學號好像不是長這樣捏，或檢查看看有沒有不小心加入了空格 இдஇ')
        parent.location.reload();
    }

    else if (/^[A|D|M|S|T]\d{7}/.test(user_studentID_val) && testmail.test(user_email_val) ){
        $.ajax({
        url :'/accounts/email_post',
        type : 'post',
        data : {
            user_studentID : user_studentID_val,
            user_email : user_email_val,
            user_uid : user_uid_val,
            csrfmiddlewaretoken : csrf,
            recaptcha: token
        }, 
        success : function(response){
            if (response.Code_message == 2){
                alert(response.Error_message)  //已註冊過
                window.location.href = "/";
            }
            else if (response.Code_message == 1){ //Pass
                $("#modal_no_register").modal('hide')
                $("#modal_register_success").modal('show')
            }
            else if (response.Code_message == 3){ //Exception
                alert(response.Error_message)
                parent.location.reload();
            }
            else if (response.Code_message == 4){ //Recaptcha error
                alert(response.Error_message)
                parent.location.reload();
            }
        }
        })
    }
    else{
        alert('輸入錯誤，記得檢查學號要大寫、信箱要正確哦！')
        parent.location.reload();
    }
    
};

