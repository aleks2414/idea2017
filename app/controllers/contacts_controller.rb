class ContactsController < ApplicationController
	def new
    @contact = Contact.new

prepare_meta_tags(title: "Contacto | Idearia Lab Agencia de Innovación Latinoamericana",
  description: "Contáctanos! Generemos diferenciación, crecimiento y transformación a través de la innovación en tu organización.", 
  keywords: %w[Innovación en México, innovación en Guatemala, innovación en Perú, innovación en Latinoamérica, crecimiento de organizaciones, transformación de organizaciones, diferenciación.],
      og: {
        site_name: "Contacto - Idearia Lab",
        title: "Contacto | Idearia Lab Agencia de Innovación Latinoamericana",
        description: "Contáctanos! Generemos diferenciación, crecimiento y transformación a través de la innovación en tu organización.",
        type: 'website'
      }
)

  end

  def create
    @contact = Contact.new(params[:contact])
    @contact.request = request
    if @contact.deliver
      flash.now[:notice] = 'Mensaje envíado. Gracias'
    else
      flash.now[:error] = 'Lo lamentamos, no se puede enviar el mensaje'
      render :new
    end
  end
end
