export class DuplicateEmailError extends Error {
  constructor(email: string) {
    super(`Email : ${email} 은 이미 사용 중인 이메일 입니다.`);
    this.name = 'DuplicateEmailError';
  }
}

export class UserCreationError extends Error {
  constructor() {
    super('사용자 생성에 실패했습니다.');
    this.name = 'UserCreationError';
  }
}
