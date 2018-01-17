require 'test_helper'

class WorkshopsControllerTest < ActionController::TestCase
  setup do
    @workshop = workshops(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:workshops)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create workshop" do
    assert_difference('Workshop.count') do
      post :create, workshop: { cv: @workshop.cv, des_des1: @workshop.des_des1, des_des2: @workshop.des_des2, des_des3: @workshop.des_des3, des_des4: @workshop.des_des4, des_tit1: @workshop.des_tit1, des_tit2: @workshop.des_tit2, des_tit3: @workshop.des_tit3, des_tit4: @workshop.des_tit4, descripcion: @workshop.descripcion, detalles: @workshop.detalles, dirigido: @workshop.dirigido, expositor: @workshop.expositor, fecha: @workshop.fecha, formato: @workshop.formato, foto: @workshop.foto, frase: @workshop.frase, horario: @workshop.horario, imagen: @workshop.imagen, lugar: @workshop.lugar, nombre: @workshop.nombre, num_dina: @workshop.num_dina, num_herra: @workshop.num_herra, num_meto: @workshop.num_meto, precio: @workshop.precio, puesto: @workshop.puesto, q_des1: @workshop.q_des1, q_des2: @workshop.q_des2, q_des3: @workshop.q_des3, q_des4: @workshop.q_des4, q_ic1: @workshop.q_ic1, q_ic2: @workshop.q_ic2, q_ic3: @workshop.q_ic3, q_ic4: @workshop.q_ic4, q_tit1: @workshop.q_tit1, q_tit2: @workshop.q_tit2, q_tit3: @workshop.q_tit3, q_tit4: @workshop.q_tit4, test_link: @workshop.test_link }
    end

    assert_redirected_to workshop_path(assigns(:workshop))
  end

  test "should show workshop" do
    get :show, id: @workshop
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @workshop
    assert_response :success
  end

  test "should update workshop" do
    patch :update, id: @workshop, workshop: { cv: @workshop.cv, des_des1: @workshop.des_des1, des_des2: @workshop.des_des2, des_des3: @workshop.des_des3, des_des4: @workshop.des_des4, des_tit1: @workshop.des_tit1, des_tit2: @workshop.des_tit2, des_tit3: @workshop.des_tit3, des_tit4: @workshop.des_tit4, descripcion: @workshop.descripcion, detalles: @workshop.detalles, dirigido: @workshop.dirigido, expositor: @workshop.expositor, fecha: @workshop.fecha, formato: @workshop.formato, foto: @workshop.foto, frase: @workshop.frase, horario: @workshop.horario, imagen: @workshop.imagen, lugar: @workshop.lugar, nombre: @workshop.nombre, num_dina: @workshop.num_dina, num_herra: @workshop.num_herra, num_meto: @workshop.num_meto, precio: @workshop.precio, puesto: @workshop.puesto, q_des1: @workshop.q_des1, q_des2: @workshop.q_des2, q_des3: @workshop.q_des3, q_des4: @workshop.q_des4, q_ic1: @workshop.q_ic1, q_ic2: @workshop.q_ic2, q_ic3: @workshop.q_ic3, q_ic4: @workshop.q_ic4, q_tit1: @workshop.q_tit1, q_tit2: @workshop.q_tit2, q_tit3: @workshop.q_tit3, q_tit4: @workshop.q_tit4, test_link: @workshop.test_link }
    assert_redirected_to workshop_path(assigns(:workshop))
  end

  test "should destroy workshop" do
    assert_difference('Workshop.count', -1) do
      delete :destroy, id: @workshop
    end

    assert_redirected_to workshops_path
  end
end
