require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get proyectos" do
    get :proyectos
    assert_response :success
  end

  test "should get emprendedores" do
    get :emprendedores
    assert_response :success
  end

  test "should get academy" do
    get :academy
    assert_response :success
  end

  test "should get idearia_lab" do
    get :idearia_lab
    assert_response :success
  end

  test "should get comerciales" do
    get :comerciales
    assert_response :success
  end

  test "should get experiencia_cliente" do
    get :experiencia_cliente
    assert_response :success
  end

  test "should get nuevos_clientes" do
    get :nuevos_clientes
    assert_response :success
  end

  test "should get nuevos_productos" do
    get :nuevos_productos
    assert_response :success
  end

  test "should get nuevas_lineas" do
    get :nuevas_lineas
    assert_response :success
  end

  test "should get lab_innovacion" do
    get :lab_innovacion
    assert_response :success
  end

  test "should get cultura_innovacion" do
    get :cultura_innovacion
    assert_response :success
  end

  test "should get diseño_web" do
    get :diseño_web
    assert_response :success
  end

  test "should get mobile" do
    get :mobile
    assert_response :success
  end

  test "should get devops" do
    get :devops
    assert_response :success
  end

  test "should get rediseño_area" do
    get :rediseño_area
    assert_response :success
  end

  test "should get reclutamiento_selección" do
    get :reclutamiento_selección
    assert_response :success
  end

  test "should get modelo_de_negocios" do
    get :modelo_de_negocios
    assert_response :success
  end

  test "should get equipo" do
    get :equipo
    assert_response :success
  end

  test "should get casos_exito" do
    get :casos_exito
    assert_response :success
  end

  test "should get herramientas" do
    get :herramientas
    assert_response :success
  end

  test "should get comerciales" do
    get :comerciales
    assert_response :success
  end

  test "should get innovacion" do
    get :innovacion
    assert_response :success
  end

  test "should get transformacion_digital" do
    get :transformacion_digital
    assert_response :success
  end

  test "should get rrhh" do
    get :rrhh
    assert_response :success
  end

end
