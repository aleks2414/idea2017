require 'test_helper'

class CasesControllerTest < ActionController::TestCase
  setup do
    @case = cases(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cases)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create case" do
    assert_difference('Case.count') do
      post :create, case: { exito_imagen: @case.exito_imagen, nombre: @case.nombre, resultados: @case.resultados, reto: @case.reto, solucion: @case.solucion }
    end

    assert_redirected_to case_path(assigns(:case))
  end

  test "should show case" do
    get :show, id: @case
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @case
    assert_response :success
  end

  test "should update case" do
    patch :update, id: @case, case: { exito_imagen: @case.exito_imagen, nombre: @case.nombre, resultados: @case.resultados, reto: @case.reto, solucion: @case.solucion }
    assert_redirected_to case_path(assigns(:case))
  end

  test "should destroy case" do
    assert_difference('Case.count', -1) do
      delete :destroy, id: @case
    end

    assert_redirected_to cases_path
  end
end
