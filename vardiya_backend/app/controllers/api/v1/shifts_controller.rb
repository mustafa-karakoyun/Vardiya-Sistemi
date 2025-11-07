class Api::V1::ShiftsController < Api::V1::BaseController
  before_action :set_shift, only: [:show, :update, :destroy]

  def index
    shifts = Shift.all
    if params[:schedule_id]
      shifts = shifts.where(schedule_id: params[:schedule_id])
    end
    render json: ShiftSerializer.new(shifts).serializable_hash
  end

  def show
    render json: ShiftSerializer.new(@shift).serializable_hash
  end

  def create
    shift = Shift.new(shift_params)
    if shift.save
      render json: ShiftSerializer.new(shift).serializable_hash, status: :created
    else
      render json: { errors: shift.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @shift.update(shift_params)
      render json: ShiftSerializer.new(@shift).serializable_hash
    else
      render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @shift.destroy
    head :no_content
  end

  private

  def set_shift
    @shift = Shift.find(params[:id])
  end

  def shift_params
    params.require(:shift).permit(:name, :start_time, :end_time, :user_id, :schedule_id)
  end
end
