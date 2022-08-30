// Подключение функционала "Чертогов Фрилансера"
import { isMobile, uniqArray } from "../files/functions.js";
import { flsModules } from "../files/modules.js";

// Наблюдатель объектов [всевидещее око]
// data-watch - можно писать значение для применения кастомного кода
// data-watch-root - родитель внутри которого налюдать за объектом
// data-watch-margin - отступ
// data-watch-threshold - процент показа объекта для срабатывания
// data-watch-once - наблюдать только один раз
// _watcher-view - класс который добавляется при появлении объекта

class ScrollWatcher {
    constructor(props) {
        let defaultConfig = {
            logging: true,
        };
        this.config = Object.assign(defaultConfig, props);
        this.observer;
        !document.documentElement.classList.contains("watcher") ? this.scrollWatcherRun() : null;
    }
    // Обновляем конструктор
    scrollWatcherUpdate() {
        this.scrollWatcherRun();
    }
    // Запускаем конструктор
    scrollWatcherRun() {
        document.documentElement.classList.add("watcher");
        this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"));
    }
    // Конструктор наблюдателей
    scrollWatcherConstructor(items) {
        if (items.length) {
            // Уникализируем параметры
            let uniqParams = uniqArray(
                Array.from(items).map(function (item) {
                    return `${
                        item.dataset.watchRoot ? item.dataset.watchRoot : null
                    }|${item.dataset.watchMargin ? item.dataset.watchMargin : "0px"}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
                })
            );
            // Получаем группы объектов с одинаковыми параметрами,
            // создаем настройки, инициализируем наблюдатель
            uniqParams.forEach((uniqParam) => {
                let uniqParamArray = uniqParam.split("|");
                let paramsWatch = {
                    root: uniqParamArray[0],
                    margin: uniqParamArray[1],
                    threshold: uniqParamArray[2],
                };
                let groupItems = Array.from(items).filter(function (item) {
                    let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
                    let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : "0px";
                    let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
                    if (
                        String(watchRoot) === paramsWatch.root &&
                        String(watchMargin) === paramsWatch.margin &&
                        String(watchThreshold) === paramsWatch.threshold
                    ) {
                        return item;
                    }
                });

                let configWatcher = this.getScrollWatcherConfig(paramsWatch);

                // Инициализация наблюдателя со своими настройками
                this.scrollWatcherInit(groupItems, configWatcher);
            });
        }
    }
    // Функция создания настроек
    getScrollWatcherConfig(paramsWatch) {
        // Создаем настройки
        let configWatcher = {};
        // Родитель, внутри которого ведется наблюдение
        if (document.querySelector(paramsWatch.root)) {
            configWatcher.root = document.querySelector(paramsWatch.root);
        }
        // Отступ срабатывания
        configWatcher.rootMargin = paramsWatch.margin;
        if (paramsWatch.margin.indexOf("px") < 0 && paramsWatch.margin.indexOf("%") < 0) {
            return;
        }
        // Точки срабатывания
        if (paramsWatch.threshold === "prx") {
            // Режим параллакса
            paramsWatch.threshold = [];
            for (let i = 0; i <= 1.0; i += 0.005) {
                paramsWatch.threshold.push(i);
            }
        } else {
            paramsWatch.threshold = paramsWatch.threshold.split(",");
        }
        configWatcher.threshold = paramsWatch.threshold;

        return configWatcher;
    }
    // Функция создания нового наблюдателя со своими настройками
    scrollWatcherCreate(configWatcher) {
        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                this.scrollWatcherCallback(entry, observer);
            });
        }, configWatcher);
    }
    // Функция инициализации наблюдателя со своими настройками
    scrollWatcherInit(items, configWatcher) {
        // Создание нового наблюдателя со своими настройками
        this.scrollWatcherCreate(configWatcher);
        // Передача наблюдателю элементов
        items.forEach((item) => this.observer.observe(item));
    }
    // Функция обработки базовых действий точек срабатываения
    scrollWatcherIntersecting(entry, targetElement) {
        if (entry.isIntersecting) {
            // Видим объект
            // Добавляем класс
            !targetElement.classList.contains("_watcher-view") ? targetElement.classList.add("_watcher-view") : null;
        } else {
            // Не видим объект
            // Убираем класс
            targetElement.classList.contains("_watcher-view") ? targetElement.classList.remove("_watcher-view") : null;
        }
    }
    // Функция отключения слежения за объектом
    scrollWatcherOff(targetElement, observer) {
        observer.unobserve(targetElement);
    }
    // Функция обработки наблюдения
    scrollWatcherCallback(entry, observer) {
        const targetElement = entry.target;
        // Обработка базовых действий точек срабатываения
        this.scrollWatcherIntersecting(entry, targetElement);
        // Если есть атрибут data-watch-once убираем слежку
        targetElement.hasAttribute("data-watch-once") && entry.isIntersecting
            ? this.scrollWatcherOff(targetElement, observer)
            : null;
        // Создаем свое событие отбратной связи
        document.dispatchEvent(
            new CustomEvent("watcherCallback", {
                detail: {
                    entry: entry,
                },
            })
        );
    }
}
// Запускаем и добавляем в объект модулей
flsModules.watcher = new ScrollWatcher({});
