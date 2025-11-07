class Api::V1::SchedulesController < Api::V1::BaseController
  before_action :set_schedule, only: [:show, :update, :destroy]

  def index
    schedules = Schedule.all
    render json: ScheduleSerializer.new(schedules).serializable_hash
  end

  def show
    render json: ScheduleSerializer.new(@schedule).serializable_hash
  end

  def create
    schedule = Schedule.new(schedule_params)

    if schedule.save
      render json: ScheduleSerializer.new(schedule).serializable_hash, status: :created
    else
      render json: { errors: schedule.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @schedule.update(schedule_params)
      render json: ScheduleSerializer.new(@schedule).serializable_hash
    else
      render json: { errors: @schedule.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @schedule.destroy
    head :no_content
  end

  private

  def set_schedule
    @schedule = Schedule.find(params[:id])
  end

  def schedule_params
    params.require(:schedule).permit(:name, :start_date, :end_date)
  end
end
