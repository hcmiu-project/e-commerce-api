import { Customer } from '@app/models/auth/customer';
import { ForgotPasswordService } from '@app/services/auth/password/forgot-password-service';
import { singleton } from 'tsyringe';

@singleton()
export class CustomerForgotPasswordService extends ForgotPasswordService {
  /**
   * Constructor.
   */
  public constructor() {
    super(Customer, 'customer');
  }
}
