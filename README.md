git 설치 진행: https://goddaehee.tistory.com/216
- git version 확인: git --version
- git 사용자 등록 및 확인
    - git config --global user.name "name"
    - git congif --global unser.email "poly@poly.com"
- 확인
    - git config --list


**Git Colne 하기**
기본 명령어
- git clone http://저장소주소/경로/경로/레포지토리명.git
warning: You appear to have cloned an empty repository. 확인될 때
- git init --bare
    - Initialized empty Git repository in C:/경로/ <가 뜬다.
- git clone http://저장소주소/경로/경로/레포지토리명.git


빈 레포지토리에 README.md를 추가한 다음 첫 커밋해보기
touch README.md
git init
git add README.md
git commit -m "first commit"
git remote and origin http://저장소주소/경로/경로/레포지토리명.git
git push -u origin master


**깃 명령어**
http://leechoong.com/posts/2017/git_command/