pipeline {
  parameters {
    choice(name: 'Environment', choices: ['ci', 'qa', 'prod'], description: 'Select environment to run automated tests')
  }
  environment {
    ENV = "{$params.Environment}"
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
    stage('help') {
      steps {
        sh 'npx playwright test --help'
      }
    }
    stage('test') {
      steps {
        if [[ $ENV = 'ci' ]]; then
          sh '''
            npx playwright test api
          '''
        elif [[ $ENV = 'qa' ]]; then
          sh '''
            npx playwright test --list
            npx playwright test
          '''
        elif [[ $ENV = 'prod' ]]; then
          sh '''
            npx playwright test --list
          '''
        fi 
      }
      post {
        success {
        //   archiveArtifacts(artifacts: '*.png', followSymlinks: false)
          sh 'pwd'
          sh 'ls -la'
          
          // publish html
          publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright Report',
            reportTitles: ''
          ])
        }



      }
    }
  }
}