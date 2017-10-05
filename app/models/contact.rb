class Contact < MailForm::Base

	attribute :name, 					:validate => false
	attribute :email, 				:validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
	attribute :phone,     		:validate => false
	attribute :profile, 		  :validate => false
	attribute :service, 			:validate => false
	attribute :city,    			:validate => false
	attribute :comments, 			:validate => false
	attribute :nickname, 			:captcha => true

def headers 
	{
	:subject => "Contact form",
	:to => "alejandroromo14@gmail.com",
	:cc => "aromo@innovaciondisruptiva.mx",
	:from => %("#{name}" <#{email}>)
	}
	end
end