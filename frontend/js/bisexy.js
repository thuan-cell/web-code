function nap_the(){
    var telco = $('#telco').val();
    var amount = $('#amount').val();
    var pin = $('#pin').val();
    var serial = $('#serial').val();

    $('#nap_the').html("<i class='fa fa-spinner fa-spin'></i> Đang xử lý...").attr('disabled','disabled');
    $.post('../progress/recharge/card.php', {telco:telco, amount:amount, pin:pin, serial:serial}, function(data){
        $('#nap_the').html("Nạp thẻ ngay").removeAttr('disabled');
        $('#nap_the_result').html(data);
    });
}

function saochep(element) {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(
        typeof element === "string" ? document.getElementById(element) : element
    );
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    swal.fire("Thông báo","Sao chép thành công", "success");
}

function use_voucher(target, product){
    Swal.fire({
    icon: "question",
    title: "Nhập mã giảm giá",
    input: "text",
    inputPlaceholder: "Nhập mã giảm giá để áp dụng",
    showCancelButton: true,
    confirmButtonText: "Áp dụng",
    cancelButtonText: "Huỷ",
    showLoaderOnConfirm: true,
    preConfirm: (inputData) => {
        $('#use_voucher').html("<i class='fa fa-spinner fa-spin'></i> Đang kiểm tra...").attr('disabled','disabled');
        $.post('../../progress/voucher.php', {code: inputData, target: target, product: product}, function(data){
            $('#use_voucher').html("<i class='fa fa-percent'></i> Dùng voucher").removeAttr('disabled');
            $('#result').html(data);
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
    })
}

function thanh_toan_source(code){
    var bethen = code;

    Swal.fire({
      title: 'Xác nhận thanh toán',
      text: "Bạn có chắc chắn muốn mua sản phẩm này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Có, thanh toán ngay'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#thanh_toan_source').html("<i class='fa fa-spinner fa-spin'></i> Đang thanh toán...").attr('disabled','disabled');
        try 
        {
            $.post('../progress/source/pay.php', {bethen: bethen}, function(data) {
                $('#thanh_toan_source').html("Mua sản phẩm này").removeAttr('disabled');
                $('#result').html(data);
            });
            } catch (error) {
                console.error('AJAX request failed: ' + error.message);
            }
        /*$.post('../progress/source/pay.php', {bethen:bethen}, function(data){
            $('#thanh_toan_source').html("Mua sản phẩm này").removeAttr('disabled');
            $('#result').html(data);
        });*/
      }
    })
  }
 
function thanh_toan_tool(code, date){
    var bethen = code;
    var time = $('#date').val();

    Swal.fire({
      title: 'Xác nhận thanh toán',
      text: "Bạn có chắc chắn muốn thuê sản phẩm này?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Có, thanh toán ngay'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#thanh_toan_tool').html("<i class='fa fa-spinner fa-spin'></i> Đang thanh toán...").attr('disabled','disabled');
        $.post('../progress/tool/pay.php', {bethen:bethen, date:time}, function(data){
            $('#thanh_toan_tool').html("Mua sản phẩm này").removeAttr('disabled');
            $('#result').html(data);
        });
      }
    })
  }

function thanh_toan_tool_vinh_vien(code, rate){
    var bethen = code;

    Swal.fire({
      title: 'Xác nhận thanh toán',
      text: "Bạn có chắc chắn muốn vĩnh viễn mua sản phẩm với giá "+rate+"VNĐ không?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Không',
      confirmButtonText: 'Có, thanh toán ngay'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#thanh_toan_tool_vinh_vien').html("<i class='fa fa-spinner fa-spin'></i> Đang thanh toán...").attr('disabled','disabled');
        $.post('../progress/tool/pay_vinh_vien.php', {bethen:bethen}, function(data){
            $('#thanh_toan_tool_vinh_vien').html("Mua sản phẩm này").removeAttr('disabled');
            $('#result').html(data);
        });
      }
    })
  }
  
function _calculate(code) {
      var code = code;
      var date = $('#date').val();
    
      $.post('../progress/tool/total_payment.php', {code:code, date:date}, function(data){
          $('#total_payment').html(data);
      });
      $.post('../progress/tool/time_expired.php', {code:code, date:date}, function(data){
          $('#time_expired').html(data);
      });
}

function show_key(key){
    var key = key;
    
    swal.fire('Key đang active','<b>'+key+'</b>','info');
}

function extend_time(transaction_code){
    var transaction_code = transaction_code;
    
    Swal.fire({
      title: 'Thông báo',
      icon: 'info',
      text: 'Nhập số ngày cần gia hạn',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Gia hạn',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`../progress/tool/extend.php?transaction_code=`+transaction_code+`&time=${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Có lỗi sảy ra: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Thông báo`,
          icon: result.value.status,
          text: result.value.msg
        })
        if(result.value.status == 'success'){
          setTimeout(function(){ window.location = ''; },2000)
        }
      }
    })
}

function active_key(transaction_code){
    var transaction_code = transaction_code;
    
    Swal.fire({
      title: 'Kích hoạt key',
      icon: 'info',
      text: 'Sao chép mã máy trong tool và dán vào ô dưới',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Huỷ',
      confirmButtonText: 'Kích hoạt',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`../progress/tool/active_key.php?transaction_code=`+transaction_code+`&key=${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Có lỗi sảy ra: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Thông báo`,
          icon: result.value.status,
          text: result.value.msg
        })
        if(result.value.status == 'success'){
          setTimeout(function(){ window.location = ''; },2000)
        }
      }
    })
}