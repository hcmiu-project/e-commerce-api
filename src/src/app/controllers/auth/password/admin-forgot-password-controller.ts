import { AdminForgotPasswordService } from '@app/services/auth/password/admin-forgot-password-service';
import { ForgotPasswordController } from '@app/controllers/auth/password/forgot-password-controller';
import { autoInjectable } from 'tsyringe';
import { ForgotPasswordValidator } from '@app/validators/auth/password/forgot-password-validator';
import { ResetPasswordValidator } from '@app/validators/auth/password/reset-password-validator';

@autoInjectable()
export class AdminForgotPasswordController extends ForgotPasswordController {
  /**
   * Constructor.
   *
   * @param forgotPasswordService forgot password service.
   * @param forgotPasswordValidator forgot password validator.
   * @param resetPasswordValidator reset password validator.
   */
  public constructor(
    forgotPasswordService: AdminForgotPasswordService,
    forgotPasswordValidator: ForgotPasswordValidator,
    resetPasswordValidator: ResetPasswordValidator,
  ) {
    super(
      forgotPasswordService,
      forgotPasswordValidator,
      resetPasswordValidator,
    );
  }
}
