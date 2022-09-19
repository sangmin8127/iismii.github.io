$('.cb-value').click(function() {
  toggle()
})

function toggle() {
    if($('.toggle-btn').find('#alarm_check').is(':checked')) {
      $('#alarm_check').attr('checked', true);
      $('.toggle-btn').addClass('active');
      $('.round-btn').addClass('btn_active');
      $('.cb-value').addClass('actvie_value');
      $('.toggle').addClass('toggle_active');
      $('.toggle-txt').addClass('txt_active');
      $('.select_day').css('display', 'block');
      $('.select_time').css('display', 'block');
  } else {
      $('.toggle-btn').removeClass('active');
      $('#alarm_check').attr('checked', false);
      $('.round-btn').removeClass('btn_active');
      $('.cb-value').removeClass('actvie_value');
      $('.toggle').removeClass('toggle_active');
      $('.toggle-txt').removeClass('txt_active');
      $('.select_day').css('display', 'none');
      $('.select_time').css('display', 'none');
    }
  }