let lotto = []; 

const init = () => {
    mkCheckArea()
    lottoryBox()
}

const mkCheckArea = () => {
    let checkBox;
    checkBox = ""

    for( let i = 1; i < 46; i++ ){
        checkBox += `<div id="checkArea" class="check-area">${i}</div>`
    }

    return document.querySelector("#lotteryPaper").innerHTML = checkBox
}

const lottoNumSort = (lottoArr) => {   // 오름차순 정렬
    lottoArr.sort((a, b) => {
        return a - b;
    });
}

const range = (start, end) => {
    let array = [];
    for (let i = start; i < end; ++i) {
        array = [...array, i];
    };
    return array;
};

const shuffle = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temporary = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temporary;
    }
}

const lottoNum = () => {

    let ballList = range(1,46)
    shuffle(ballList)

    for(let i = 0; i < 6; i++){
        lotto = [...lotto, ballList[i]];
    };

    for( let i = 0; i < lotto.length; i++){ // 로또 번호 check
        let lottoIndex = lotto[i]
        document.querySelectorAll("#checkArea")[lottoIndex-1].classList.add("active") 
    }
    lottoNumSort(lotto)
}

const lottoryBox = () => {
    const checkArea = document.querySelectorAll("#checkArea");
    const lotteryResults = document.querySelector("#lotteryResults");

    for( let i = 0; i < checkArea.length; i++){  // 로또 번호 클릭 이벤트
        checkArea[i].addEventListener("click", () => {

            let activeCheckArea = document.querySelectorAll("#checkArea.active")
            let checkAreaTxt = Number(checkArea[i].innerText)      // 체크박스 숫자
            let lottoIdx = lotto.indexOf(checkAreaTxt)             // 인덱스 번호
            
            if(activeCheckArea.length > 5){

                if( checkArea[i].classList.contains("active") ){  // index 6개 일 때 active 비활성화
                    checkArea[i].classList.toggle("active")
                    lotto.splice(lottoIdx, 1);
                    lottoNumSort(lotto)
                    lotteryResults.innerHTML = "번호 " + lotto
                } else {
                    alert("6개 이하의 숫자만 입력 가능합니다.")
                }

            }else{

                if( checkArea[i].classList.contains("active") ){  // 결과값 제거
                    lotto.splice(lottoIdx, 1);
                    lotteryResults.innerHTML = "번호 " + lotto
                } else {        
                    lotto.splice(0, 0, checkAreaTxt)
                    lottoNumSort(lotto)
                    lotteryResults.innerHTML = "번호 " + lotto
                }

                checkArea[i].classList.toggle("active")
            }
        })
    }
}

const reset = () => {
    lotto = []
    document.querySelectorAll("#checkArea").forEach((item, index) => {
        document.querySelectorAll("#checkArea")[index].classList.remove("active")
    })
}

const autoSel = () => {  // 자동선택 버튼
    reset()
    lottoNum()
    document.querySelector("#lotteryResults").innerHTML = "번호 " + lotto
};

const cancelBtn = () => {  // 취소 버튼
    reset()
    document.querySelector("#lotteryResults").innerHTML = "번호 "
};

init()
