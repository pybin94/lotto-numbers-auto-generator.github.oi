async function checkArea(){
    for( let i = 1; i < 46; i++ ){
        document.querySelector("#lotteryPaper").innerHTML += `<div id="checkArea" class="check-area">${i}</div>`
    }
}

checkArea().then(function(){
    let lotto = []; 
    const checkArea = document.querySelectorAll("#checkArea")
    const lotteryResults = document.querySelector("#lotteryResults")
    const autoSel = document.querySelector("#autoSel")
    const cancel = document.querySelector("#cancel")

    function lottoNumSort(){   // 숫자 오름차순 정렬
        lotto.sort(function(a,b){
            return a - b;
        });
    }

    function lottoNum(){
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
    
    // lottoNum()

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
                    lotteryResults.innerHTML = "당첨 번호 " + lotto
                } else {
                    alert("6개 이하의 숫자만 입력 가능합니다")
                }

            }else{

                if( checkArea[i].classList.contains("active") ){  // 결과값 제거
                    lotto.splice(lottoIdx, 1);
                    lotteryResults.innerHTML = "당첨 번호 " + lotto
                } else {        
                    lotto.splice(0, 0, checkAreaTxt)
                    lottoNumSort()
                    lotteryResults.innerHTML = "당첨 번호 " + lotto
                }

                checkArea[i].classList.toggle("active")
            }

        })

        autoSel.addEventListener("click", function(){  // 자동선택 버튼

            checkArea[i].classList.remove("active")

        })

        cancel.addEventListener("click", function(){  // 취소 버튼

            checkArea[i].classList.remove("active")

        })
    }

    autoSel.addEventListener("click", function(){  // 자동선택 버튼

        lotto = []; 
        lottoNum()
        lotteryResults.innerHTML = "당첨 번호 " + lotto

    })

    cancel.addEventListener("click", function(){  // 취소 버튼

        lotteryResults.innerHTML = "당첨 번호 = "
        lotto = []; 

    })

    // 로또 결과
    lotteryResults.innerHTML = "당첨 번호 "
    
})
