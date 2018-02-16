class WorkshopsController < ApplicationController
  before_action :set_workshop, only: [:show, :edit, :update, :destroy]

  # GET /workshops
  # GET /workshops.json
  def index
    @contact = Contact.new
    @workshops = Workshop.all

  prepare_meta_tags(title: "Academy | Idearia Lab Agencia de Innovación Latinoamericana",
  description: "Aprende a hacer innovación. Diseña estrategia, lidera equipos, aplica el proceso y transmite cultura a través de nuestra suite de innovación.", 
  keywords: %w[Enseñamos-innovación hacemos-innovación conferencias-de-innovación talleres-de-innovación taller-de-estrategia-de-innovación taller-de-equipos-de-innovación taller-de-procesos-de-innovación taller-de-cultura-de-innovación taller-de-diseño-de-experiencia-de-cliente taller-de-diseño-de-nuevos-productos-y-servicios taller-de-diseño-de-nuevas-líneas-de-negocio taller-de-diseño-de-modelo-de-negocio taller-de-design-thinking taller-de-lean-startup taller-de-innovación-colaborativa taller-de-prototipado taller-de-planeación-estratégica taller-de-sprint-design],
  og: {
        site_name: "Academy - Idearia Lab",
        title: "Academy | Idearia Lab Agencia de Innovación Latinoamericana",
        description: "Aprende a hacer innovación. Diseña estrategia, lidera equipos, aplica el proceso y transmite cultura a través de nuestra suite de innovación.",
        type: 'website'
      }
)
    
  end

  # GET /workshops/1
  # GET /workshops/1.json
  def show
    @contact = Contact.new
    @workshops = Workshop.where("fecha > ?", @workshop.fecha).order('id ASC').limit(2)

prepare_meta_tags(title: @workshop.titulos,
  description: @workshop.descripciones, 
  keywords: @workshop.keywords,
    og: {
        site_name: @workshop.titulos,
        title: @workshop.titulos,
        description: @workshop.descripciones,
        type: 'website'
      }
)

  end

  # GET /workshops/new
  def new
    @contact = Contact.new
    @workshop = Workshop.new
    1.times {@workshop.blocks.build}
  end

  # GET /workshops/1/edit
  def edit
    @contact = Contact.new
  end

  # POST /workshops
  # POST /workshops.json
  def create
    @workshop = Workshop.new(workshop_params)

    respond_to do |format|
      if @workshop.save
        format.html { redirect_to @workshop, notice: 'Workshop was successfully created.' }
        format.json { render :show, status: :created, location: @workshop }
      else
        format.html { render :new }
        format.json { render json: @workshop.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /workshops/1
  # PATCH/PUT /workshops/1.json
  def update
    respond_to do |format|
      if @workshop.update(workshop_params)
        format.html { redirect_to @workshop, notice: 'Workshop was successfully updated.' }
        format.json { render :show, status: :ok, location: @workshop }
      else
        format.html { render :edit }
        format.json { render json: @workshop.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /workshops/1
  # DELETE /workshops/1.json
  def destroy
    @workshop.destroy
    respond_to do |format|
      format.html { redirect_to workshops_url, notice: 'Workshop was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_workshop
      @workshop = Workshop.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def workshop_params
      params.require(:workshop).permit(:nombre, :frase, :fecha, :lugar, :horario, :formato, :precio, :num_meto, :num_dina, :num_herra, :dirigido, :descripcion, :detalles, :expositor, :puesto, :cv, :foto, :test_link, :imagen, :q_tit1, :q_ic1, :q_des1, :q_tit2, :q_ic2, :q_des2, :q_tit3, :q_ic3, :q_des3, :q_tit4, :q_ic4, :q_des4, :des_tit1, :des_des1, :des_tit2, :des_des2, :des_tit3, :des_des3, :des_tit4, :des_des4, :fechas, :titulos, :descripciones, :keywords, blocks_attributes: [:id, :title, :content, :duration])
    end
end
