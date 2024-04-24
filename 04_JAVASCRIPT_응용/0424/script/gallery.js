// gallery.js

$(document).ready(function(){

  //1. 변수선언
  let g_img = $('.g_list li a');
  let img_url;

  //2. 이벤트
  g_img.hover(function(){ //mouseenter
    $(this).find('.caption').stop().animate({'bottom':'0px'},200);
  },function(){ //mouseleave
    $('.caption').stop().animate({'bottom':'-40px'},100);
  });

  //3. 이미지 클릭시 모달 윈도 띄우기
  g_img.click(function(){
    //선택한 a요소의 href속성값을 변수에 저장한다.
    img_url = $(this).attr('href');

    //저장된 img_url값을 출력해본다.
    // console.log(img_url);
    let modal = `
      <div class='modal'>
        <div class='modal_inner'>
        <input type='button' value='닫기' class='c_btn'>
          <img src='${img_url}' alt=''>
        </div>
      </div>
    `
    //body태그 뒤에 모달출력하기
    $('body').append(modal);

    //닫기버튼클릭시 모달을 숨겨라
    $('.c_btn').click(function(){
      $('.modal').hide();
      //c_btn을 id값으로 주면 각li당 동일한 id가 생기므로 버그가 생긴다. 그래서 class로 준다
    });

    return false;
  });

});