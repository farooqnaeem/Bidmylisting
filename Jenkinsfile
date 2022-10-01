pipeline {
  parameters {
    choice(name: 'Environment', choices: ['ci', 'qa', 'prod'], description: 'Select environment to run automated tests')
  }
  environment {
    ENV = "${params.Environment}"
    TESTMO_URL = 'https://bml.testmo.net/'
    TESTMO_TOKEN = credentials('TESTMO_TOKEN')
  }
  agent { 
    docker { 
      image 'mcr.microsoft.com/playwright:v1.22.0-focal'
    } 
  }
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npx playwright install
        '''
      }
    }
    stage('install testmo cli') {
      steps {
        sh '''
          npm ci
          npm install --no-save @testmo/testmo-cli
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          if [ $ENV = 'ci' ]; then
            echo "BML_ENV=CI" > .env
            cat .env
            npx playwright test api --config=playwright.ci.config.js --project=chromium --workers=1
            npx playwright test ui/login.spec --config=playwright.ci.config.js --project=chromium --workers=1
            npx playwright test ui/agent-registration.spec --config=playwright.ci.config.js --project=chromium --workers=1
            npx playwright test ui/homeowner-registration.spec --config=playwright.ci.config.js --project=chromium --workers=1
            npx playwright test ui/homepage.spec --config=playwright.ci.config.js --project=chromium --workers=1
            npx playwright test ui/marketing-funnel.spec --config=playwright.ci.config.js --project=chromium --workers=1
          elif [ $ENV = 'qa' ]; then
            echo "BML_ENV=QA" > .env
            cat .env
            npx playwright test api --config=playwright.qa.config.js --project=chromium --workers=1
            npx playwright test ui/agent-registration.spec --config=playwright.qa.config.js --project=chromium --workers=1
          elif [ $ENV = 'prod' ]; then
            echo "BML_ENV=PROD" > .env
            cat .env
            npx playwright test --list --config=playwright.prod.config.js --project=chromium --workers=1
          fi 
        '''
      }
      
      post {
        always {
          // publish html
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'results.html',
            reportName: 'Playwright Report',
            reportTitles: ''
          ])

          archiveArtifacts(artifacts: '*.xml', followSymlinks: false)

          sh '''
            npx testmo automation:run:submit \
                --instance $TESTMO_URL \
                --project-id 1 \
                --name "Automated test run" \
                --source "backend-unit" \
                --results playwright-report/*.html
          '''

        }
        success {
        //   archiveArtifacts(artifacts: '*.png', followSymlinks: false)
          sh 'pwd'
          sh 'ls -la'
          
        }
        
        failure {  
          echo "not looking good..."
          // mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "jason@bidmylisting.com";  
        } 



      }
    }
  }
}