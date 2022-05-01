<?php

namespace App\Http\Requests\Shop;

use App\Http\Requests\CustomFormRequest;

class UpdateShopRequest extends CustomFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return !is_null(auth()->user()->shop);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return $this->requireAtLeastOne([
            'name' => 'string|max:30',
            'slug' => 'string|max:40',
            'description' => 'string|max:500',
            'avatar_image' => 'string|min:32|max:32',
            'cover_image' => 'string|min:32|max:32',
            'banners' => 'array|min:1|max:5',
            'banners.*.image' => 'required_without:banners.*.video|string|min:32|max:32',
            'banners.*.video' => [
                'required_without:banners.*.image',
                'string',
                'regex:/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/',
            ],
        ]);
    }
}
