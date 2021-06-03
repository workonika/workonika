exports.survey = (req, res) => res.render('survey', {csrf: 'Ah2/*txZQ9!;|aS32`~k99'})

exports.surveyProcess = (req, res) => {
    console.log('Форма (из строки запроса): ' + req.query.form)
    console.log('Токен CSRF (из скрытого поля формы): ' + req.body._csrf)
    console.log('Имя (из видимого поля формы): ' + req.body.name)
    console.log('E-mail (из видимого поля формы): ' + req.body.email)
    res.redirect(303, '/survey/thank-you')
}

exports.surveyThankYou = (req, res) => res.render('survey-thank-you')
