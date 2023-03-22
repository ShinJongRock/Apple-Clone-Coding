(() => {
    
    let yOffset = 0; // 페이지 y옵셋 대신 쓸 변수
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 세션들을 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된 씬 (세션)



    const sceneInfo = [
        // 0
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 함
            scrollHeight : 0,
            objs:{
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0.main-message.a'),
                messageB: document.querySelector('#scroll-section-0.main-message.b'),
                messageC: document.querySelector('#scroll-section-0.main-message.c'),
                messageD: document.querySelector('#scroll-section-0.main-message.d'),
            },
            values: {
                messageA_opacity: [0, 1]
            }
        },
        // 1
        {
            type: 'normal',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 함
            scrollHeight:0,
            objs:{
                container: document.querySelector('#scroll-section-1')
            }
        },
        // 2
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 함
            scrollHeight:0,
            objs:{
                container: document.querySelector('#scroll-section-2')
            }
        },
        // 3
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 함
            scrollHeight:0,
            objs:{
                container: document.querySelector('#scroll-section-3')
            }
        }

        
    ];


    function setLayout() {
        //각스크롤 높이 세팅
        for(let i = 0; i< sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height =`${sceneInfo[i].scrollHeight}px`;
        }
       let totalScrollHeight = 0;
        for (let i = 0 ; i < sceneInfo.length; i++ ) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`); //바디에 아이디 넣기
    }



    function calcValues(values, currentYOffset){
        let rv;
        let scrollRatio =  currentYOffset/ sceneInfo[currentScene].scrollHeight;
        
        rv = scrollRatio * (values[1] - values[0]) + values[0];

        return rv;
    }

    function platAnimation(){
        const  values = sceneInfo[currentScene].values;
        const objs = sceneInfo[currentScene].objs;
        const currentYOffset = yOffset - prevScrollHeight;

        switch (currentScene){
            case 0 :
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }


  
    //콘솔 스크롤 위치값 출력
    function scrollLoop(){
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++){
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }

        if(yOffset < prevScrollHeight){
            if(currentScene === 0) return
            currentScene--;
        }
        // console.log(currentScent);

        document.body.setAttribute('id', `show-scene-${currentScene}`); //바디에 아이디 넣기

    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset
        scrollLoop();
    });
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);
    setLayout();


})();
