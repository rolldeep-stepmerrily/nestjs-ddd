### version log


#### 1.0.3 (2024-10-15 14:48)

1. 아키텍쳐 구조 일부 수정
2. HTTP 오류 프레젠테이션(인터페이스) 레이어로 이동
   * 그에 따라 도메인 예외 추가
3. 사용자 생성 API 추가 



#### 1.0.2 (2024-10-15 12:22)

1. User Entity 추가
   1. Email, Name, Password ValueObject 추가
   2. Test 추가
2. Shared Domain(Entity,Identifier,UniqueEntityId,ValueObject) 추가

***

#### 1.0.1 (2024-10-11 17:34)

1. 이메일 인증 요청 및 이메일 인증 완료 추가

***

#### 1.0.0 (2024-10-11 17:34)

1. 전체 코드 DDD 구조에 맞게 리팩터링
   
***

#### 0.0.2 (2024-10-04 18:10)

1. User Module 
   * NodeMailer 및 Redis를 이용해 이메일 인증 구현
   * 회원가입 구현
   * JWT Access Token 로그인 구현
   * JWT Refresh Token으로 JWT Access Token 재발급 구현

***

#### 0.0.1 

초기 릴리스

