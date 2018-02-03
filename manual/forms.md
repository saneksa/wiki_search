# Формы

Адрес страницы: /wiki_search

Класс: containers/CustomWikiSearch

Для работы с формами используется [redux-form](http://redux-form.com/6.5.0/)

Подход к созданию формы такой:
  1. Пишется класс, который будет представлять собой форму. В propTypes этого класса добавляются propTypes из redux-form
  2. Этот класс оборачивается в redux-form при помощи функции [`reduxForm`](http://redux-form.com/6.5.0/docs/api/ReduxForm.md/)
  3. Обернутый класс, через [props](http://redux-form.com/6.5.0/docs/api/Props.md/), получает управляющие функции и флаги, которые используются в коде класса.
   Например redux-form передает prop `handleSubmit`. Она используется для вызова submit у формы. Есть еще флаги
   `pristine`, `submitting` которые можно использовать для задания стилей формы в состоянии "ничего не изменено" и "выполняется применение".
  4. Для задания полей используется компонент [`Field`](http://redux-form.com/6.5.0/docs/api/Field.md/)