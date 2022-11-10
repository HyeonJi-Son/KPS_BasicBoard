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


**Git Bash 사용하여 PR 넣는 방법**
1. git status를 확인
2. git add.
3. git status로 add된 내역을 다시 확인해본다.
4. git commit -m "[작업자명]작업내용[태그]"
5. git pull
    - 이 때, bash상에서 " Please enter a commit message to explain why this merge is necessary, especially if it merges an updated upstream into a topic branch " 라는 메세지가 확인되는 경우 해결 방법은 다음과 같다.
        1. i 입력
        2. merge에 대한 commit 메세지 입력
        3. esc 입력
        4. :wq 입력

5. enter 입력
6. git push
7. 본인의 사본 저장소로 향하여 PR요청을 넣는다.