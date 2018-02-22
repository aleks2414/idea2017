class Contact < MailForm::Base

	attribute :name, 					:validate => false
	attribute :email, 				:validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
	attribute :phone,     		:validate => false
	attribute :profile, 		  :validate => false
	attribute :service, 			:validate => false
	attribute :donde, 		   	:validate => false
	attribute :city,    			:validate => false
	attribute :comments, 			:validate => false
	attribute :nickname, 			:captcha => true

def headers 
	{
	:subject => "Contact form",
	:to => "marizu@idearialab.com",
	:cc => "contacto@idearialab.com",
	:from => %("#{name}" <#{email}>)
	}
	end
end