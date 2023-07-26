export enum E_PROMISE_STATE {
  /**
   * 进行中
   */
  Pending = 'pending',

  /**
   * 完成
   */
  Fulfilled = 'fulfilled',

  /**
   * 完成, 但是失败
   */
  Rejected = 'rejected',
}