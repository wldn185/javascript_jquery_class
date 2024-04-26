$(document).ready(function(){

  //1. 변수선언
  let gnb = $('.gnb > ul > li > a') //메인메뉴
  let c_btn = $('.lnb li');
  let slide = $('.slide_wrapper div');
  let i = $('.lnb li').index(); //인덱스값
  const l_btn = $('main .slide .s_btn li:first-child img');
  const r_btn = $('main .slide .s_btn li:last-child img');
  let t_mnu = $('.tab_con li a');
  // console.log(i);

  // tab콘텐츠 탭메뉴 클릭시 a서식 지우고 클릭한 메뉴만 t_act적용하기
  t_mnu.click(function(){
    $(this).addClass('t_act').parent().siblings().find('a').removeClass('t_act');
    $('.cont').hide();
    $(this).next().show();

    let t_index = $(this).parent().index(); //인덱스값은 a태그로 안구해지고 li로 구해진다. 똑같은 태그가 나열되어야하기 때문이다. a는 li에 들어가있기때문에 나란히 나열되어있지않다. 그래서 나란히 나열되어있는 li로 인덱스값을 구해야한다.
    console.log(t_index); //0, 1, 2

    if(t_index==2){
      $('.tab_con_wrap article').height(800);
    }else{
      $('.tab_con_wrap article').height(500);
    }



    return false;
  });

  // 메인메뉴를 클릭하면 해당 서브만 나오게 하기
  gnb.click(function(){
    $(this).next().toggle().parent().siblings().find('.sub').hide();
    //toggle이 아니라 show로 하면 새로고침하지 않는 이상 나온 sub메뉴를 숨기지 못한다.

    return false;
  });
  //다른곳을 클릭하면 나온 서브메뉴를 숨기기
  $('body').click(function(){
    $('.sub').hide();
  });

  //2. 이미지가 변하는 함수
  function fadeInOut(){ //우측버튼 함수    
    c_btn.removeClass('act'); //콘트롤 버튼에 서식 모두제거하고
    slide.eq(i).fadeOut(); //보이는 이미지전부 숨기고
    console.log(i);

    if(i==2){
      i=0; //인덱스값을 0로 대입하고          
    }else{ //그렇지 않으면
      i++; //1씩 더하여 다음 이미지가 나오게한다.
    }
        
    slide.eq(i).fadeIn(); //인덱스 번호에 해당하는 n번째 이미지가 나옴
    c_btn.eq(i).addClass('act'); //인덱스 번호에 해당하는 콘트롤버튼에 서식 적용
  }

  function fadeInOut2(){  //좌측버튼 함수
    c_btn.removeClass('act'); //콘트롤 버튼에 서식 모두제거하고
    slide.eq(i).fadeOut(); //보이는 이미지전부 숨기고
    console.log(i);

    if(i==0){ //만약에 인덱스값이 0이라면 = 처음이미지라면
      i=2; //인덱스값을 2로 대입하고 = 마지막 이미지     
    }else{ //그렇지 않으면
      i--; //1씩 빼서 이전 이미지가 나오게한다.
    }
        
    slide.eq(i).fadeIn(); //인덱스 번호에 해당하는 n번째 이미지가 나옴
    c_btn.eq(i).addClass('act'); //인덱스 번호에 해당하는 콘트롤버튼에 서식 적용
  }

  //좌우버튼 클릭시 각각 해당함수 호출하여 이미지 변경
  l_btn.click(function(){
    clearInterval(Timer);
    fadeInOut2();
  });
  r_btn.click(function(){
    clearInterval(Timer);
    fadeInOut();  
  });

  //3. 매 3초마다 반복실행 => Timer
  let Timer = setInterval(function(){fadeInOut();},3000);

  //콘트롤 버튼 클릭시 해당 이미지 나오게하기
  $('.slide .lnb li').click(function(){
    // alert('click');
    clearInterval(Timer);
    let i = $(this).index();
    console.log(i);

    slide.stop().fadeOut();
    slide.eq(i).stop().fadeIn();

    c_btn.removeClass('act');
    c_btn.eq(i).addClass('act');

  });

  //좌, 우 콘트롤 버튼에 마우스 아웃시 자동으로 플레이 되도록 한다.
  $('.slide .s_btn li img, slide .lnb li').mouseleave(function(){
    clearInterval(Timer);
    Timer = setInterval(fadeInOut, 3000);
  });


  //4. 콘트롤버튼 클릭하면 해당 이미지가 나오고 콘트롤 서식도 바뀌게
  // c_btn.click(function(){
  //   clearInterval(Timer);
  //   i = $(this).index()-1; //인덱스값
  //   fadeInOut(i);
  // });
  // //마우스오버시 시간 멈춤, 마우스 떠나면 시간 다시 흐름
  // c_btn.mouseleave(function(){
  //   clearInterval(Timer);
  //   Timer = setInterval(function(){
  //     fadeInOut();
  //   },3000);
  // });

  // 5. 정지버튼 클릭시 시간 제거 / 일시정지, 재생버튼 변경
  $('i.fa-pause').click(function(){
    clearInterval(Timer); //혹시라도 시간이 멈추지 않는 경우가 있을때 확실하게 시간을 죽여주기위해 clearInterval(Timer)을 한 번 더 써준다.
    if($(this).hasClass('fa-pause')==true){ //일시정지 모양일때
      clearInterval(Timer); //애니메이션 멈추고
      $(this).attr('class','fas fa-play'); //버튼모양이 변경되도록 한다.
    }else{
      $(this).attr('class','fas fa-pause');
      Timer = setInterval(function(){
      fadeInOut();
      },3000); // 이 일을 3초마다 반복한다.
    }
  });

  //이벤트슬라이드
  let e_left_btn = $('.evnet i.fa-angle-left');
  let e_right_btn = $('.evnet i.fa-angle-right');
  const eslid = $('es_wrap'); //슬라이드를 담고 있는 부모wrap 부모가 움직이고 안에 자식 slide의 위치가 바뀜

  //1번의 앞에 3번이 오도록 위치 잡는다.
  $('.es_wrap > div:last-child').insertBefore('.es_wrap > div:first-child');
  eslide.css('margin-left','-100%');

  //움직이는 함수
  function e_move_left(){
    eslide.animate({'margin-left':'-200%'},500, function(){
      $('.es_wrap > div:first-child').insertAfter('.es_wrap > div:last-child');
      eslide.css('margin-left','-100%');
    });
  }

  function e_move_right(){}

  //시간객체 - 3초마다 함수를 호출한다.
  let eTimer = setInterval(e_move_right,3000);

  //버튼 클릭시 각각 해당 함수를 호출
  e_left_btn.click(function(){
    clearInterval(eTimer);
    e_move_left();
  });
  e_right_btn.click(function(){
    clearInterval(eTimer);
    e_move_right();
  });

  //좌, 우버튼 마우스 아웃시 빼면다시 움직이게 함
  $('.event i.fa-solid').mouseleave(function(){
    eTimer = setInterval(e_move_left,3000);
  });
});