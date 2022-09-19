
    // 버튼1, 버튼2 클릭 시 아래 스크립트 동시실행.
    // 1.박스 안 텍스트 변경 .
    // 2.버튼 클릭시 박스 노출.
    function 알림창열기(동시실행) {
        document.getElementById('title').innerHTML = 동시실행;
        document.getElementById('alert').style.display = 'block';
    }

    // 닫기 버튼 스크립트. close라는 아이디값을 찾아서 
    // 함수 내 스타일 값의 click 이벤트를 실행한다.
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById('alert').style.display = 'none';
    })

