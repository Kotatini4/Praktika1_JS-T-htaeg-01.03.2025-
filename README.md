![TalTech Logo](images/tal-tech.png)
Test

# TALLINNA TEHNIKAÜLIKOOL

### INSENERITEADUSKOND

**Virumaa kolledž**

**RAM0541 Veebiprogrammeerimine** _(N. Ivleva)_

# Веб-приложение с тремя задачами

## Структура проекта

📂 **Проект**

-   📄 `index.html` (главная страница с меню)
-   📄 `roadmap.html` (дорожная карта)
-   📄 `news.html` (новости)
-   📄 `workout.html` (план тренировок)
-   📂 **css**
    -   📄 `styles.css` (основные стили)
-   📂 **js**
    -   📄 `roadmap.js` (логика для дорожной карты)
    -   📄 `news.js` (логика для новостей)
    -   📄 `workout.js` (логика для тренировок)
    -   📄 `marked.js` (позволяет рендерить содержимое .md файлов (например, README.md) в удобный для чтения HTML-код.)
-   📂 **data**
    -   📄 `roadmap.json` (данные по дорожной карте)

## Новости взяты из бесплатного API https://newsapi.org/

     {
         "status": "ok",
         "totalResults": 1959,
         "articles": [
         {
             "source": {
                 "id": null,
                 "name": "Gizmodo.com"
             },
             "author": "Kyle Barr",
             "title": "Apple Says It Will Showcase a New ‘Family Member’ That’s Likely the iPhone SE 4",
             "description": "Apple's next big launch will take place next week, and we all expect it to be Apple's cheaper iPhone SE, or the 'iPhone 16E.'",
             "url": "https://gizmodo.com/apple-says-it-will-showcase-a-new-family-member-thats-likely-the-iphone-se-4-2000563660",
             "urlToImage": "https://gizmodo.com/app/uploads/2024/10/iPhone-SE-Phone-1-e1727875305463.jpg",
             "publishedAt": "2025-02-13T17:18:36Z",
             "content": "Apple is set to launch..."
         }]
     }

## Как запустить проект

### 1. Запуск через локальный сервер

Из-за политики CORS браузер может блокировать загрузку файлов напрямую. Чтобы обойти это ограничение, необходимо запустить локальный сервер.

#### Если у вас установлен Python:

-   **Python 3:**
    ```sh
    python -m http.server 8000
    ```

http://localhost:8000/
