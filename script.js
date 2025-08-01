document.getElementById('generateReport').addEventListener('click', () => {
    // 1. 입력 값 가져오기
    const logoFile = document.getElementById('logoUpload').files[0];
    const dataFile = document.getElementById('dataUpload').files[0];
    const surveyPeriod = document.getElementById('surveyPeriod').value;

    if (!dataFile || !surveyPeriod) {
        alert('설문 데이터와 기간을 모두 입력해주세요.');
        return;
    }

    // 2. 로고 이미지 표시
    if (logoFile) {
        const logoUrl = URL.createObjectURL(logoFile);
        document.getElementById('reportLogo').src = logoUrl;
    }

    // 3. 설문 기간 표시
    document.getElementById('reportPeriod').innerText = `설문 기간: ${surveyPeriod}`;
    
    // 4. CSV 데이터 파싱 및 처리
    Papa.parse(dataFile, {
        header: true, // CSV 첫 줄을 헤더로 인식
        complete: (results) => {
            // 'results.data'에 파싱된 데이터가 들어있음
            const surveyData = results.data;
            
            // 5. 데이터 분석 및 점수 계산 (가장 중요한 부분)
            // 예시: '신뢰', '소통' 영역의 점수를 계산하는 로직
            // 실제로는 정의하신 모델에 맞게 정교한 계산 로직을 구현해야 합니다.
            const scores = processData(surveyData); 

            // 6. 차트 생성
            createRadarChart(scores);

            // 7. 리포트 영역 보여주기
            document.getElementById('report-output').style.display = 'block';
        }
    });
});

function processData(data) {
    // 이 함수에서 설문 데이터를 기반으로 영역별 점수를 계산합니다.
    // 예: 각 문항의 평균을 내고, 영역별로 합산/평균을 구합니다.
    // 결과는 아래와 같은 형식으로 반환해야 합니다.
    const calculatedScores = {
        labels: ['심리적 안정감', '상호 신뢰', '목표 명확성', '역할과 책임', '의미'],
        scores: [4.2, 3.8, 4.5, 4.1, 3.5] // 계산된 점수
    };
    return calculatedScores;
}

function createRadarChart(data) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: data.labels,
            datasets: [{
                label: '팀 효과성 점수',
                data: data.scores,
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 5 // 5점 척도인 경우
                }
            }
        }
    });
}
