<?php

namespace App\Http\Controllers\Api\Order;

use App\Enums\Pagination;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\CreateOrderRequest;
use App\Http\Requests\Order\GetOrderRequest;
use App\Models\Order\Order;
use App\Services\OrderService;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;

        $this->middleware('auth:sanctum');
    }

    /**
     * Get orders of the current user by status.
     *
     * @param \App\Http\Requests\Order\GetOrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(GetOrderRequest $request)
    {
        $orderQuery = $request->validated();

        $orders = isset($orderQuery['status_id'])
            ? Order::where('user_id', $request->user()->id)
            : Order::where([
                ['user_id', $request->user()->id],
                ['status_id', $orderQuery['status_id']]
            ]);

        $orders = $orders
            ->with(['product', 'receivedAddress', 'pickupAddress'])
            ->paginate($orderQuery['limit'] ?? Pagination::Default);

        return response()->json([
            'status' => true,
            'data' => $orders,
        ]);
    }

    /**
     * Create new orders for the current users.
     *
     * @param \App\Http\Requests\Order\CreateOrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(CreateOrderRequest $request)
    {
        $this->orderService->create(
            $request->user()->id,
            $request->validated(),
        );

        return response()->json([
            'status' => true,
            'message' => 'Orders have been created!',
        ], Response::HTTP_CREATED);
    }
}
