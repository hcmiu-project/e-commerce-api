<?php

namespace App\Http\Requests;

use App\Models\User\BankAccount;
use App\Rules\UniqueUserBankAccountNumber;

class UpdateUserBankAccountRequest extends CustomFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !is_null(BankAccount::where([
            ['id', $this->route('bank_account')->id],
            ['user_id', $this->user()->id],
        ])->first());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->requireLeastOne([
            'accountholder_name' => 'string|max:64',
            'identification_number' => 'digits_between:9,12',
            'bank_name' => 'string',
            'bank_branch' => 'string',
            'account_number' => [
                'digits_between:9,17',
                new UniqueUserBankAccountNumber($this->user()->id),
            ],
        ]);
    }
}