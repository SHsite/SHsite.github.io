# SHsite.github.io
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>팀효과성 진단 리포트 자동화 시스템</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        .header h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2.5em;
            font-weight: 700;
        }
        
        .header p {
            color: #7f8c8d;
            font-size: 1.1em;
        }
        
        .input-section, .report-section {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .section-title {
            color: #2c3e50;
            margin-bottom: 25px;
            font-size: 1.8em;
            font-weight: 600;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #3498db;
        }
        
        .file-upload {
            border: 2px dashed #3498db;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            background: #f8f9fa;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .file-upload:hover {
            background: #e3f2fd;
            border-color: #2196f3;
        }
        
        .file-upload input {
            display: none;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .btn-group {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .report-content {
            display: none;
        }
        
        .report-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        
        .company-info h2 {
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .company-info p {
            color: #7f8c8d;
        }
        
        .logo-container {
            max-width: 150px;
            max-height: 80px;
        }
        
        .logo-container img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card h3 {
            font-size: 2em;
            margin-bottom: 5px;
        }
        
        .stat-card p {
            opacity: 0.9;
        }
        
        .chart-container {
            margin: 30px 0;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .findings {
            background: #f8f9fa;
            border-left: 5px solid #3498db;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 10px 10px 0;
        }
        
        .findings h4 {
            color: #2c3e50;
            margin-bottom: 15px;
        }
        
        .findings ul {
            list-style: none;
            padding-left: 0;
        }
        
        .findings li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        
        .findings li:before {
            content: "▶";
            color: #3498db;
            position: absolute;
            left: 0;
        }
        
        .factor-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .factor-card {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border-top: 4px solid;
        }
        
        .factor-card.direction { border-top-color: #e74c3c; }
        .factor-card.relationship { border-top-color: #f39c12; }
        .factor-card.execution { border-top-color: #27ae60; }
        .factor-card.arrangement { border-top-color: #3498db; }
        .factor-card.management { border-top-color: #9b59b6; }
        .factor-card.agility { border-top-color: #1abc9c; }
        
        .factor-card h4 {
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .score-display {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .gap-display {
            font-size: 0.9em;
            color: #7f8c8d;
        }
        
        .subjective-responses {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .response-category {
            margin-bottom: 25px;
        }
        
        .response-category h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #3498db;
        }
        
        .response-list {
            background: white;
            border-radius: 10px;
            padding: 15px;
            margin-top: 10px;
        }
        
        .response-item {
            margin-bottom: 10px;
            padding: 8px 12px;
            background: #f1f3f4;
            border-radius: 8px;
            font-size: 0.95em;
        }
        
        @media print {
            body {
                background: white;
                color: black;
            }
            
            .input-section {
                display: none;
            }
            
            .report-content {
                display: block !important;
            }
            
            .btn-group {
                display: none;
            }
            
            .chart-container {
                page-break-inside: avoid;
            }
        }
        
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>팀효과성 진단 리포트 자동화 시스템</h1>
            <p>DREAM+A 모델 기반 팀효과성 진단 및 리포트 생성</p>
        </div>

        <!-- Input Section -->
        <div class="input-section" id="inputSection">
            <h2 class="section-title">📊 진단 정보 입력</h2>
            
            <div class="form-group">
                <label for="companyName">회사명</label>
                <input type="text" id="companyName" placeholder="예: 서울대학교병원 건강증진센터">
            </div>
            
            <div class="form-group">
                <label for="teamName">팀/부서명</label>
                <input type="text" id="teamName" placeholder="예: 건강증진센터">
            </div>
            
            <div class="form-group">
                <label for="reportDate">진단일자</label>
                <input type="date" id="reportDate">
            </div>
            
            <div class="form-group">
                <label for="totalMembers">전체 인원</label>
                <input type="number" id="totalMembers" placeholder="36" min="1">
            </div>
            
            <div class="form-group">
                <label for="leaderCount">팀장 수</label>
                <input type="number" id="leaderCount" placeholder="1" min="1">
            </div>
            
            <div class="form-group">
                <label for="logoUpload">회사 로고</label>
                <div class="file-upload" onclick="document.getElementById('logoFile').click()">
                    <input type="file" id="logoFile" accept="image/*">
                    <p>클릭하여 로고 이미지를 업로드하세요</p>
                    <small>PNG, JPG, GIF 형식 지원</small>
                </div>
            </div>
            
            <div class="form-group">
                <label for="csvUpload">설문 데이터 (CSV)</label>
                <div class="file-upload" onclick="document.getElementById('csvFile').click()">
                    <input type="file" id="csvFile" accept=".csv">
                    <p>클릭하여 CSV 파일을 업로드하세요</p>
                    <small>기존 양식과 동일한 구조의 CSV 파일</small>
                </div>
            </div>
            
            <div class="btn-group">
                <button class="btn" onclick="generateReport()">📈 리포트 생성</button>
                <button class="btn" onclick="loadSampleData()" style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);">📋 샘플 데이터 로드</button>
            </div>
        </div>

        <!-- Report Section -->
        <div class="report-section" id="reportSection">
            <div class="report-content" id="reportContent">
                <!-- 리포트 내용이 여기에 동적으로 생성됩니다 -->
            </div>
            
            <div class="btn-group">
                <button class="btn" onclick="printReport()">🖨️ 인쇄/PDF</button>
                <button class="btn" onclick="showInputSection()" style="background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);">📝 새 리포트 작성</button>
            </div>
        </div>
    </div>

    <script>
        // DREAM+A 모델 정의
        const dreamModel = {
            factors: {
                'D': { 
                    name: '명확한 방향성', 
                    color: '#e74c3c',
                    subfactors: [
                        { key: 'direction_understanding', name: '팀 목표/방향성 인지 및 이해', items: [1, 7, 13] },
                        { key: 'direction_alignment', name: '팀 목표/방향성 정렬', items: [19, 25, 31] }
                    ]
                },
                'R': { 
                    name: '긍정적 관계', 
                    color: '#f39c12',
                    subfactors: [
                        { key: 'emotional_trust', name: '정서적 신뢰관계', items: [2, 8, 14, 32] },
                        { key: 'open_communication', name: '개방적 소통', items: [20, 26] }
                    ]
                },
                'E': { 
                    name: '팀으로서 실행', 
                    color: '#27ae60',
                    subfactors: [
                        { key: 'knowledge_sharing', name: '지식/기술 공유를 통한 성장', items: [3, 9, 15, 21, 27, 33] },
                        { key: 'constructive_feedback', name: '건설적 문제제기와 피드백', items: [] }
                    ]
                },
                'A': { 
                    name: '팀 역할 정렬', 
                    color: '#3498db',
                    subfactors: [
                        { key: 'effective_role_distribution', name: '효과적인 역할 배분', items: [4, 10, 16, 22, 28, 34] },
                        { key: 'mutual_role_understanding', name: '상호 역할 이해 및 조정', items: [] }
                    ]
                },
                'M': { 
                    name: '팀 업무 관리', 
                    color: '#9b59b6',
                    subfactors: [
                        { key: 'performance_facilitation', name: '실행을 촉진하는 수행관리', items: [5, 11, 17, 23, 29, 35] },
                        { key: 'process_recognition', name: '과정 및 결과에 대한 인정', items: [] }
                    ]
                },
                '+A': { 
                    name: '팀 민첩성', 
                    color: '#1abc9c',
                    subfactors: [
                        { key: 'situational_awareness', name: '상시경계', items: [6] },
                        { key: 'speed', name: '신속성', items: [12, 18, 24] },
                        { key: 'flexibility', name: '유연성', items: [30, 36] }
                    ]
                }
            }
        };

        let surveyData = null;
        let companyLogo = null;

        // 파일 업로드 핸들러
        document.getElementById('logoFile').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    companyLogo = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById('csvFile').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                        surveyData = results.data;
                        console.log('CSV 데이터 로드 완료:', surveyData.length, '개 응답');
                    },
                    error: function(error) {
                        alert('CSV 파일 읽기 오류: ' + error.message);
                    }
                });
            }
        });

        // 샘플 데이터 로드
        function loadSampleData() {
            document.getElementById('companyName').value = '서울대학교병원';
            document.getElementById('teamName').value = '건강증진센터';
            document.getElementById('reportDate').value = '2023-05-02';
            document.getElementById('totalMembers').value = '36';
            document.getElementById('leaderCount').value = '1';
            
            // 샘플 CSV 데이터 파싱 (실제 데이터)
            const sampleCsvData = `응답자ID,귀하의 직책을 선택해 주세요,우리 팀원들은 팀의 미션과 목표를 명확히 이해하고 있다.,우리 팀원들은 동료의 경험 의견 성향 차이를 인정하고 커뮤니케이션 한다.,우리 팀원들은 새롭게 학습한 지식/기술을 적극적으로 공유한다,우리 팀은 구성원의 역량과 개인의 니즈를 고려해 업무가 배분되어 있다.,우리 팀의 구성원들은 업무 목표 수립 시 적극적으로 참여하고 있다.,우리 팀원들은 의료환경이나 고객의 요구 및 변화를 예의 주시하고 있다.,우리 팀원들은 팀 목표가 조직의 비전 전략과 연계되어 있음을 명확히 인식하고 있다.,우리 팀원들은 동료의 업무 외적인 부분에 대해서도 관심을 갖고 배려한다.,우리 팀원들은 업무 수행에 요구되는 정보 등의 리소스를 충분히 공유하고 있다.,우리 팀은 업무 간 연계성을 고려하여 유기적으로 담당 업무를 조정하고 있다.,우리 팀원들은 각자의 목표를 달성하기 위한 구체적인 실행계획을 가지고 있다.,우리 팀원들은 빠른 환경 변화 속에서 새로운 지식과 기술 등에 대해 인지하고 있다.,우리 팀원들은 자신의 업무가 팀의 목표 달성에 기여하고 있음을 명확하게 인식하고 있다.,우리 팀원들은 동료의 말과 행동을 믿고 존중한다.,우리 팀원들은 업무가 마무리 되었을 때 수행과정과 결과를 복기하여 향후 팀 업무에 적용한다.,우리 팀원들은 리더로부터 업무 수행에 필요한 권한과 책임을 위임 받아 일하고 있다.,우리 팀원들은 업무 수행에 대해 진척도 관리를 지속적으로 받고 있다.,우리 팀원들은 내외부 고객들의 요구사항 또는 문제 발생시 신속하게 필요한 대안을 마련한다.,우리 팀원들은 팀 목표와 실행계획 수립 과정에 참여한다.,우리 팀원들은 동료의 입장과 상황을 고려해 열린 자세로 들으려고 노력한다.,우리 팀원들은 팀원간 피드백을 적극적으로 수용한다.,우리 팀원들은 서로가 맡고 있는 업무의 역할과 책임을 잘 인식하고 있다.,우리 팀원들은 업적 및 역량 평가가 공정하다고 생각한다.,우리 팀원들은 과제를 수행 할 때 사전 계획 수립이나 점검하기 보다는 신속하게 실행하는 것에 더 큰 가치를 둔다,우리 팀원들은 개인의 과제 목표 비전이 팀의 과제 목표 비전과 연계되어 있다고 느끼고 있다.,우리 팀원들은 동료와 의견차이가 발생할 경우 적극적으로 해결책을 모색한다.,우리 팀원들은 업무에서 예측되는 리스크 문제점 등을 적극적으로 제시한다.,우리 팀원들은 팀 내 업무분장에 문제가 발생할 경우 적극적으로 해결책을 모색한다.,우리 팀원들은 성과에 따라 공정하게 보상받고 있다고 느낀다.,우리 팀원들은 대내외 환경이 변할 경우 기존의 목표와 실행계획을 유연하게 수정한다.,우리 팀원들은 동료의 업무 내용과 진행 상황을 파악하고 있다.,우리 팀원들은 동료와 관계 갈등이 발생한 경우 이를 해소하기 위해 적극 노력한다.,우리 팀원들은 타 팀원의 문제를 해결할 수 있는 아이디어를 적극적으로 개진한다.,우리 팀의 하위 파트/그룹은 팀 성과달성을 지원하는데 있어 효과적으로 구성되어 있다.,우리 팀원들은 수행과정과 성과에 대해 적극적인 칭찬과 인정을 받고 있다고 느낀다.,우리 팀원들은 최초의(한번 내린) 판단이나 대응에 얽매이지 않고 변화된 상황을 개방적으로 수용하고 다시 대응한다.
3,팀장,4,4,4,3,4,4,4,4,4,3,4,3,4,4,4,4,4,4,4,3,3,4,3,3,3,3,4,4,3,4,3,4,3,4,3,4
1,팀원,4,5,5,4,5,4,4,4,3,4,4,4,4,4,4,4,4,5,5,4,4,5,3,3,4,4,4,4,3,4,4,4,4,4,3,4
2,팀원,4,5,4,4,5,4,5,5,4,4,4,4,5,4,5,5,4,5,4,5,5,5,4,5,5,5,5,5,4,4,4,4,5,4,5,4`;

            Papa.parse(sampleCsvData, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    surveyData = results.data;
                    alert('샘플 데이터가 로드되었습니다. 이제 리포트를 생성할 수 있습니다.');
                }
            });
        }

        // 리포트 생성
        function generateReport() {
            if (!surveyData) {
                alert('CSV 데이터를 먼저 업로드해주세요.');
                return;
            }

            const companyName = document.getElementById('companyName').value;
            const teamName = document.getElementById('teamName').value;
            const reportDate = document.getElementById('reportDate').value;
            const totalMembers = document.getElementById('totalMembers').value;
            const leaderCount = document.getElementById('leaderCount').value;

            if (!companyName || !teamName || !reportDate || !totalMembers) {
                alert('필수 정보를 모두 입력해주세요.');
                return;
            }

            // 데이터 분석
            const analysis = analyzeSurveyData(surveyData);
            
            // 리포트 HTML 생성
            const reportHtml = generateReportHtml({
                companyName,
                teamName,
                reportDate,
                totalMembers: parseInt(totalMembers),
                leaderCount: parseInt(leaderCount),
                analysis,
                logo: companyLogo
            });

            document.getElementById('reportContent').innerHTML = reportHtml;
            
            // 차트 생성
            setTimeout(() => {
                createCharts(analysis);
                document.getElementById('inputSection').style.display = 'none';
                document.getElementById('reportSection').style.display = 'block';
                document.querySelector('.report-content').style.display = 'block';
            }, 100);
        }

        // 설문 데이터 분석
        function analyzeSurveyData(data) {
            const leaders = data.filter(row => row['귀하의 직책을 선택해 주세요'] === '팀장');
            const members = data.filter(row => row['귀하의 직책을 선택해 주세요'] === '팀원');
            
            const questions = [];
            for (let i = 1; i <= 36; i++) {
                const columnName = Object.keys(data[0]).find(key => 
                    key.includes('우리 팀') && Object.keys(data[0]).indexOf(key) === i + 1
                );
                if (columnName) {
                    questions.push(columnName);
                }
            }

            // 각 문항별 점수 계산
            const scores = {
                total: { all: 0, leader: 0, member: 0 },
                factors: {},
                questions: []
            };

            // 문항별 분석
            questions.forEach((question, index) => {
                const allScores = data.map(row => parseFloat(row[question]) || 0).filter(score => score > 0);
                const leaderScores = leaders.map(row => parseFloat(row[question]) || 0).filter(score => score > 0);
                const memberScores = members.map(row => parseFloat(row[question]) || 0).filter(score => score > 0);

                const questionAnalysis = {
                    index: index + 1,
                    question: question.length > 50 ? question.substring(0, 50) + '...' : question,
                    fullQuestion: question,
                    all: allScores.length > 0 ? (allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0,
                    leader: leaderScores.length > 0 ? (leaderScores.reduce((a, b
