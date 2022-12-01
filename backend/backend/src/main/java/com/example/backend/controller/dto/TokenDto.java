package com.example.backend.controller.dto;

import lombok.*;

/* 사용된 어노테이션 종류
@Builder : 클래스 레벨(메서드)이나 생성자에 붙이면 파라미터를 활요하여 빌더 패턴을 자동으로 생성해준다.
    -빌더 패턴: 생성과 관련된 디자인 패턴, 동일한 프로세스를 거쳐 다양한 구성의 인스턴스를 만드는 방법

@Data
    - @Getter/@Setter : 필드/클래스에 선언하면 자동으로 getOoo, setOoo 메소드 생성해준다.
        - Lombok에서 가장 많이 사용되는 어노테이션이다.
    - @equalsAndHashCode: 자바 빈을 만들 때 자주 오버라이딩하는 equals와 hashCode.
        - 해당 어노테이션을 ㅅ용하면 이 메소드를 자동으로 생성할 수 있다.
        - (callSuper = true/false )속성을 통해 메소드 자동생성시 부모 클래스까지 감안할지 설정 가능
            - true: 부모 클래스 필드 값들도 동일한지 체크
            - false: (기본값) 자신의 클래스 필드 값만 고려함
    - @ToString: toString()메소드를 자동 생성해준다.
        - (exclude = "특정필드")를 사용하면 toString()결과에서 제외시킬 수도 있다.
    - @RequiredArgsConstructor: final이나 @NonNull인 필드 값만 파라미터로 받는 생성자를 만들어준다.

@NoArgsConstructor : 파라미터가 없는 기본 생성자를 생성해준다.
    -

@AllArgsConstructor : 모든 필드 값을 파라미터로 받는 생성자를 만들어준다.
    -

 */
@Builder
@Getter
/*처음엔 @Data를 사용하려고 했는데, @Data가 포함하고 있는 @RequireArgsConstructor의 특성이
아래 두 어노테이션과 충돌이 있는 것 같아서 불필요하다고 생각되었음.
또, 해당 클래스가 어떤 것을 필요로 하는지 직관적으로 보이지 않는다고 생각되어 @Getter만 작성.
필요하다면 다시 @Data로 돌아가자.
 */
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto { //토큰의 값을 헤더에서 뽑거나 헤더에서 삽입할 때 쓰는 dto이다.
    private String grantType;
    private String accessToken;
    private Long tokenExpiresIn;
}
