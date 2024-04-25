// gallery.js

$(document).ready(function(){

  //1. 변수선언
  let g_img = $('.g_list li a');
  const g_nav = $('.g_nav ul li a')
  let img_url, title;
  let n = 1; //초기 넘버
  let total_n = $('.g_list li').length; //li 의 개수 //12
  // console.log(total_n);

  // 내비 메뉴 -> g.nav 클릭시 act서식 적용하고 부모의 다른 형제요소의 자식요소 a에는 act서식을 제거한다.
  g_nav.click(function(e){
    $(this).addClass('act').parent().siblings().find('a').removeClass('act');

    if($(this).parent().index()==0){
      //전체메뉴클릭시 12장의 목록이 전체보여진다
      //기존 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
      $('.g_list li').hide();
      $('.g_list li').fadeIn();      
    }else if($(this).parent().index()==1){
      //기획메뉴클릭시 .plan클래스가 보여진다.
      //기존 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
      $('.g_list li').hide();
      $('.plan').fadeIn();      
    }else if($(this).parent().index()==2){
      //설계메뉴클릭시 .design클래스가 보여진다.
      //기존 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
      $('.g_list li').hide();
      $('.design').fadeIn();
    }else if($(this).parent().index()==3){
      //디자인메뉴클릭시 .ui클래스가 보여진다.
      //기존 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
      $('.g_list li').hide();
      $('.ui').fadeIn();
    }else{
      //개발메뉴클릭시 .coding클래스가 보여진다.
      //기존 li목록은 무조건 숨기고, 해당하는 목록만 보여지게 한다.
      $('.g_list li').hide();
      $('.coding').fadeIn();
    }

    return false;
  });

  //2. 이미지 마우스 오버시 효과
  g_img.hover(function(){ //mouseenter
    $(this).find('.caption').stop().animate({'bottom':'0px'},200);
  },function(){ //mouseleave
    $('.caption').stop().animate({'bottom':'-40px'},100);
  });

  //3. 이미지 클릭시 모달 윈도 띄우기
  g_img.click(function(){

    //선택한 a요소의 href속성값을 변수에 저장한다.
    img_url = $(this).attr('href');
    title = $(this).attr('title'); //이미지별 제목1
    // 이미지별 제목2 title = $(this).find('img').attr('alt');
    // 이미지별 제목 3 title = $(this).find('span').text();
    
    //인덱스번호
    n = $(this).parent().index()+1; //인덱스가 0부터 세지는데 1부터 세라고 +1해준다.
    console.log(n);

    //저장된 img_url값을 출력해본다.
    // console.log(img_url);
    let modal = `
      <div class='modal'>
        <div class='modal_inner'>
          <h3>${title}</h3>
          <img src='${img_url}' alt=''>
          <span>${n}/${total_n}</span>
          <i class = 'fas fa-times c_btn'></i>
          <i class = 'fas fa-angle-left'></i>
          <i class = 'fas fa-angle-right'></i>
        </div>
      </div>
    `; //이미지를 클릭했을 때 모달창이 나오고 좌우버튼도 나온다. 그래서 모달창 안에 버튼 소스들이 있어야한다. 모달 출력전에 버튼변수를 선언해놓으면 버튼이 동작하지 않는다.

    //body태그 뒤에 모달출력하기
    $('body').append(modal);  

    // 좌, 우버튼 클릭시 '이미지', '타이틀', '페이지번호' 작동
    $('.modal i.fa-angle-left').click(function(){
      // alert('click_l');
      //1씩 감소
      if(n==1){
        n=total_n;
      }else{
        n--;
      }
      // 숫자변경, 타이틀제목변경, 이미지 변경해주기 위한 함수호출
      dataChange(n);
    });
    $('.modal i.fa-angle-right').click(function(){
      // alert('click_r');
      //1씩 증가
      if(n==total_n){
        n=1;
      }else{
        n++;
      }
      // 숫자변경, 타이틀제목변경, 이미지 변경해주기 위한 함수호출
      dataChange(n);
    });

    // 숫자변경, 타이틀제목변경, 이미지 변경해주기 위한 함수호출
    function dataChange(i){
      // alert('click');
      //i는 위에 n값은 받는 변수
      //1. 페이지번호
      $('.modal span').text(`${i}/${total_n}`);

      //2. 타이틀제목 caption의 text값을 가져와서 출력
      $('.modal h3').text($('.g_list li').eq(i-1).find('.caption').text());
      //i에 -1을 해주는 이유는 eq메서드는 0부터 시작하는데 i는 1부터 시작하기 때문에 eq(i)는 값이 1이 된다. 그래서 -1을 해주어 0으로 만들어주고 0부터 인덱스를 세주기위함이다.

      //3. 이미지 태그에 해당 번호를 삽입하여 이미지 변경하기
      // 4, 9 ,11 은 png이다. 만약 i가 4, 9, 11일때만 아래내용 적용한다. (1번째 방법. 변수값을 사용하여 구현)
      // if(i==4||i==9||i==11){
      //   $('.modal img').attr('src','./images/img'+i+'.png');
      // }else{
      //   $('.modal img').attr('src','./images/img'+i+'.jpg');
      // }
      // 2번째 방법, 이미지 주소값을 가져와서 이미지 변경 
      let src=$('.g_list li').eq(i-1).find('img').attr('src');
      $('.modal img').attr('src', src);
    }

    //닫기버튼클릭시 모달을 숨겨라
    $('.c_btn').click(function(){
      $('.modal').hide();
      //c_btn을 id값으로 주면 각li당 동일한 id가 생기므로 버그가 생긴다. 그래서 class로 준다
    });

    return false;    
  });

  // 탭 클릭하면 해당 콘텐츠가 나옴


});