class InquiryController < ApplicationController
  def index

    # お問い合わせ画面表示
    @inquiry = Inquiry.new
    render :action => 'index'

  end

  def confirm
    # 入力画面の表示
    @inquiry = Inquiry.new(params[:inquiry].permit(:name, :email, :message))
    if @inquiry.valid?
      # OK。確認画面を表示
      render :action => 'confirm'
    else
      # NG。入力画面を再表示
      render :action => 'index'
    end
  end

  def thanks
    # メール送信
    @inquiry = Inquiry.new(params[:inquiry].permit(:name, :email, :message))
    InquiryMailer.received_email(@inquiry).deliver

    # 完了画面の表示
    render :action => 'thanks'

  end
end
