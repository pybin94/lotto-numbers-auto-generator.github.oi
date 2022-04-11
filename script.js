const init = () => {
    lottoryBox()
}

const mkCheckArea = async () => {

    let checkBox;
    checkBox = ""

    for( let i = 1; i < 46; i++ ){
        checkBox += `<div id="checkArea" class="check-area">${i}</div>`
    }

    return document.querySelector("#lotteryPaper").innerHTML = checkBox
}

const lottoryBox = async () => {
    
    await mkCheckArea()

    let lotto = []; 
    const checkArea = document.querySelectorAll("#checkArea")
    const lotteryResults = document.querySelector("#lotteryResults")
    const autoSel = document.querySelector("#autoSel")
    const cancel = document.querySelector("#cancel")

    const lottoNumSort = () => {   // 오름차순 정렬
        lotto.sort(function(a,b){
            return a - b;
        });
    }

    const lottoNum = () => {
        for(let i = 0; i < 6; i++){
            let num = Math.floor(Math.random() * 44) + 1;
            
            for(let j in lotto){
                if(num == lotto[j]){ // 숫자 중복 체크
                    num = Math.floor(Math.random() * 44) + 1;
                }
            }

            lotto.push(num);
        }

        for( let i = 0; i < lotto.length; i++){ // 로또 번호 check
            let lottoIndex = lotto[i]
            
            checkArea[lottoIndex-1].classList.add("active") 
        }

        lottoNumSort()

    }

    for( let i = 0; i < checkArea.length; i++){  // 로또 번호 클릭 이벤트
        checkArea[i].addEventListener("click", function(){

            let activeCheckArea = document.querySelectorAll("#checkArea.active")
            let checkAreaTxt = Number(checkArea[i].innerText)      // 체크박스 숫자
            let lottoIdx = lotto.indexOf(checkAreaTxt)             // 인덱스 번호
            
            if(activeCheckArea.length > 5){

                if( checkArea[i].classList.contains("active") ){  // index 6개 일 때 active 비활성화
                    checkArea[i].classList.toggle("active")
                    lotto.splice(lottoIdx, 1);
                    lottoNumSort()
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
                    lottoNumSort()
                    lotteryResults.innerHTML = "번호 " + lotto
                }

                checkArea[i].classList.toggle("active")
            }

        })

    }
    const reset = () => {
        lotto = []
        checkArea.forEach((item, index) => {
            checkArea[index].classList.remove("active")
        })
    }
    
    autoSel.addEventListener("click", () => {  // 자동선택 버튼
        reset()
        lottoNum()
        lotteryResults.innerHTML = "번호 " + lotto
    })
    
    cancel.addEventListener("click", () => {  // 취소 버튼
        reset()
        lotteryResults.innerHTML = "번호 "
    })

    // 로또 결과
    lotteryResults.innerHTML = "번호 "
    
}




init()