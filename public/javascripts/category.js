$(document).ready(function() {
  $('#add_category_button').on('click', function(){
    var add_category_input_value = $('#add_category_input').val();
    var user_id = $('#user_id').val();
    var post_daata = {
      add_category: add_category_input_value,
      add_user_id: user_id
    };
    var post_url = '/category';
    $.ajax({
      type: 'POST',
      data: post_daata,
      url: post_url,
      dataType: 'JSON'
    }).done(function(res) {
      if (res.msg === 'ok') {
        console.log('ok');
        location.reload();
      }
      else {
        console.log('not ok');
      }
    });
  });
});