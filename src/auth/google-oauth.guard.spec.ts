import { GoogleOauthGuard } from 'src/auth/google-oauth.guard';

describe('GoogleOauthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleOauthGuard()).toBeDefined();
  });
});
