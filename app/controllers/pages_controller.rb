class PagesController < ApplicationController
 

def hacemos
	@contact = Contact.new

prepare_meta_tags(title: "Hacemos innovación | Idearia Lab Agencia de Innovación",
  description: "Hacemos innovación, contigo o por ti, desde la definición de la estrategia hasta la implementación de un proyecto que genere valor para tu organización.", 
  keywords: %w[Hacemos-innovación hacemos-la-definición-de-la-estrategia hacemos-un-equipo-de-alto-rendimiento proceso-de-innovación hacemos-proyectos-de-innovación agregar-valor-al-cliente provocar-una-mayor-diferenciación impacto-en-el-resultado crecimiento-de-la-organización implementamos-proyectos-que-generen-valor mejoramos-el-posicionamiento crecemos-la-rentabilidad ganamos-participación-de-mercado]
)

end

def entrenamos
	@contact = Contact.new

prepare_meta_tags(title: "Entrenamos en innovación | Idearia Lab Agencia de Innovación",
  description: "Te entrenamos para que puedas ejecutar nuestro modelo de innovación, desde definir estrategia hasta implementar proyectos que generen verdadero valor.", 
  keywords: %w[Entrenamiento-en-innovación entrenamiento-en-definición-de-estrategia-de-innovación entrenamiento-en-armado-de-equipos-de-innovación entrenamiento-en-proceso-de-innovación entrenamiento-en-cultura-de-innovación agregar-valor-al-cliente provocar-mayor-diferenciación crecer-rentabilidad mejorar-posicionamiento ganar-participación-de-mercado crecimiento-de-la-organización]
)

  
end

def academy
	@contact = Contact.new

prepare_meta_tags(title: "Academy | Idearia Lab Agencia de Innovación Latinoamericana",
  description: "Aprende a hacer innovación. Diseña estrategia, lidera equipos, aplica el proceso y transmite cultura a través de nuestra suite de innovación.", 
  keywords: %w[Enseñamos-innovación hacemos-innovación conferencias-de-innovación talleres-de-innovación taller-de-estrategia-de-innovación taller-de-equipos-de-innovación taller-de-procesos-de-innovación taller-de-cultura-de-innovación taller-de-diseño-de-experiencia-de-cliente taller-de-diseño-de-nuevos-productos-y-servicios taller-de-diseño-de-nuevas-líneas-de-negocio taller-de-diseño-de-modelo-de-negocio taller-de-design-thinking taller-de-lean-startup taller-de-innovación-colaborativa taller-de-prototipado taller-de-planeación-estratégica taller-de-sprint-design]
)

end

def digital
  @contact = Contact.new

prepare_meta_tags(title: "Transformación digital | Idearia Lab Agencia de Innovación",
  description: "Provocamos la diferenciación, el crecimiento y la transformación a partir de la incursión de la tecnología en las organizaciones.", 
  keywords: %w[Transformación-digital desarrollo-web desarrollo-de-apps desarrollo-de-devops desarrollo-de-plataformas-web diseño-de-frontend desarrollo-de-backend desarrollo-de-API desarrollos-android desarrollos-ios programación-en-android programación-en-ios desarrollo-de-webapps transformación-digital-en-las-empresas desarrollo-de-apps-moviles generación-de-insights diseño-de-mockups diseño-de-wireframes experiencia-de-usuario UX diseño-de-interfaz ingeniería-de-software historias-de-usuario arquitectura-del-desarrollo desarrollo-ágil]
)

end

def guate
  @contact = Contact.new
end 

def idearia_lab
  @contact = Contact.new

prepare_meta_tags(title: "Nosotros | Idearia Lab Agencia de Innovación Latinoamericana",
  description: "No somos una simple agencia. Entendemos las necesidades de las organizaciones latinoamericanas como nadie y nuestro impacto en la región lo demuestra.", 
  keywords: %w[Equipos-de-innovación agentes-de-cambio agencia-de-innovación Jorge-Peralta Memo-Muñoz Alex-Romo Nemesio-Arriola Alberto-Vázquez Marcela-Arriola Marizu-Musi Juan-Carlos-Laguardia Christian-Bautista Miguel-Oquendo Alfredo-Godoy Alfredo-Fuentes agencia-de-innovación-Latinoamericana]
)

end
end
