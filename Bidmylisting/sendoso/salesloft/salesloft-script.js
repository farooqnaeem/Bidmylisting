const regex =  /(https:\/\/app.salesloft.com\/app\/people*)/
SendosoScript.initialize(regex, () => SalesloftWidget, 'salesloft');
