$(document).ready(function () {

    // --- LEER PARÃ METROS DE URL ---
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Obtener nombre de familia y cupos de la URL
    const nombreFamilia = getUrlParameter('familia');
    const cupos = getUrlParameter('cupos');

    // Mostrar nombre de familia en la secciÃ³n lugar y fecha
    if (nombreFamilia) {
        const nombreDecodificado = decodeURIComponent(nombreFamilia);
        $('#nombre-familia').text(nombreDecodificado);
    } else {
        $('#nombre-familia').text('Invitado Especial'); // Valor por defecto
    }

    // Guardar cupos para mostrar en confirmaciÃ³n
    window.cuposInvitacion = cupos || '';

    // --- LÃ“GICA DEL CARRUSEL 3D ---
    const items = [
        {
            image: 'img/11.jpeg',
            caption: 'Chiquitin'
        },
        {
            image: 'img/23.jpeg',
            caption: 'Pensativa'
        },
        {
            image: 'img/1.jpeg',
            caption: 'Maravilla'
        },
        {
            image: 'img/25.jpeg',
            caption: 'Mis 8 años'
        },
        {
            image: 'img/222.jpeg',
            caption: 'Yo'
        },
        {
            image: 'img/14.jpeg',
            caption: 'Mis 14 años'

        },
        {
            image: 'img/2.jpeg',
            caption: 'De paseo'

        },

        {
            image: 'img/555.jpeg',
            caption: 'Feliz'

        },

    ];

    // Variables de estado
    const totalItems = items.length;
    const angle = 360 / totalItems;
    const radius = 300; // Radio del carrusel, ajustado para el tamaÃ±o de la tarjeta
    let carouselInitialized = false;

    function createCarouselItems() {
        const carousel = document.getElementById('carousel');
        const indicatorsContainer = document.getElementById('indicators');
        if (!carousel || !indicatorsContainer) return;

        // Limpiar contenido existente (si lo hubiera)
        carousel.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        for (let i = 0; i < totalItems; i++) {
            // Crear elemento del carrusel
            const item = document.createElement('div');
            item.className = 'carousel-item';

            const img = document.createElement('img');
            img.className = 'carousel-img';
            img.src = items[i].image;
            img.alt = items[i].caption;

            const caption = document.createElement('div');
            caption.className = 'carousel-caption';
            caption.textContent = items[i].caption;

            item.appendChild(img);
            item.appendChild(caption);
            carousel.appendChild(item);

            // Crear indicadores
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.dataset.index = i;
            indicatorsContainer.appendChild(indicator);
        }

        // Posicionar elementos en 3D
        positionItems();
        updateIndicators(0); // Inicializar el indicador activo

        // Forzar que el carrusel sea visible y la animaciÃ³n se active
        const carouselElement = document.querySelector('.carousel');
        if (carouselElement) {
            carouselElement.style.display = 'block';
            carouselElement.style.animation = 'rotate 30s infinite linear';
        }

        carouselInitialized = true;
    }

    function ensureCarouselVisible() {
        const momentosSection = $('#momentos');
        const carousel = momentosSection.find('.carousel');
        const carouselScene = momentosSection.find('.carousel-scene');

        if (carousel.length && momentosSection.hasClass('is-active')) {
            // Asegurar que el contenedor del carrusel estÃ© visible
            carouselScene.css({
                'visibility': 'visible',
                'opacity': '1',
                'display': 'block'
            });

            // Forzar re-aplicaciÃ³n de la animaciÃ³n del carrusel
            const carouselElement = carousel[0];
            if (carouselElement) {
                // Re-aplicar estilos inline para asegurar visibilidad
                carouselElement.style.display = 'block';
                carouselElement.style.visibility = 'visible';
                carouselElement.style.opacity = '1';

                // Forzar reinicio de la animaciÃ³n
                carouselElement.style.animation = 'none';
                setTimeout(() => {
                    carouselElement.style.animation = 'rotate 30s infinite linear';
                }, 10);
            }
        }
    }

    // Posicionar elementos en el espacio 3D
    function positionItems() {
        const carouselItems = document.querySelectorAll('#momentos .carousel-item');

        carouselItems.forEach((item, index) => {
            // Calcular rotaciÃ³n en el eje Y
            const rotateY = index * angle;

            // Aplicar transformaciÃ³n
            item.style.transform = `rotateY(${rotateY}deg) translateZ(${radius}px)`;
        });
    }

    // FunciÃ³n para actualizar el indicador activo (opcional, si se implementa navegaciÃ³n)
    function updateIndicators(activeIndex) {
        document.querySelectorAll('#momentos .indicator').forEach((ind, index) => {
            ind.classList.toggle('active', index === activeIndex);
        });
    }

    // No inicializar el carrusel inmediatamente, se inicializarÃ¡ cuando se navegue a la secciÃ³n
    // Esto evita problemas de visibilidad

    // --- FIN LÃ“GICA DEL CARRUSEL 3D ---

    // PartÃ­culas deshabilitadas
    // function createFloaters() {
    //     // Deshabilitado
    // }

    // PartÃ­culas deshabilitadas
    // function createFloaters() {
    //     // Deshabilitado
    // }



    // --- CONTEO INICIAL Y TRANSICIÃ“N ---
    let initialCount = 1;
    const music = $('#background-music')[0];

    // BotÃ³n de abrir invitaciÃ³n
    console.log('Script cargado');
    console.log('BotÃ³n encontrado:', $('#open-invitation-btn').length);

    // Usar on() con delegaciÃ³n directa
    $(document).on('click', '#open-invitation-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('BotÃ³n clickeado!');

        // Iniciar mÃºsica cuando el usuario hace clic
        if (music) {
            music.play().catch(function (error) {
                console.log('Error al reproducir mÃºsica:', error);
            });
        }

        // Ocultar pantalla de bienvenida inmediatamente
        $('#welcome-screen').css('display', 'none');
        $('#initial-countdown-screen').removeClass('d-none');
        runInitialCountdown();
    });

    function runInitialCountdown() {
        if (initialCount > 0) {
            $('#countdown-number').text(initialCount).parent().removeClass().addClass('card-countdown animate__animated animate__zoomIn');
            setTimeout(() => { $('#countdown-number').parent().removeClass().addClass('card-countdown animate__animated animate__zoomOut'); }, 250);
            initialCount--;
            setTimeout(runInitialCountdown, 300);
        } else {
            // AnimaciÃ³n especial al terminar
            $('#countdown-number').text('AcompaÃ±ame...').css('font-size', '12vw').parent().removeClass().addClass('card-countdown animate__animated animate__zoomIn');

            setTimeout(() => {
                $('#initial-countdown-screen').addClass('animate__animated animate__fadeOut');
                setTimeout(() => {
                    $('#initial-countdown-screen').remove();
                    // TransiciÃ³n suave a la primera secciÃ³n
                    $('#invitation-main').removeClass('d-none').css('opacity', 0);
                    $('#navigation-controls, #music-btn').removeClass('d-none');

                    $('#portada').addClass('is-active').css('opacity', 0);

                    // AnimaciÃ³n de entrada elegante
                    setTimeout(() => {
                        $('#invitation-main').css('opacity', 1);
                        $('#portada').css({
                            'opacity': 1,
                            'animation': 'zoomIn 1s ease-out'
                        });
                        animateSectionContent($('#portada'));
                        updateNavButtons();
                    }, 50);
                }, 150);
            }, 100);
        }
    }


    // --- LÃ“GICA DE NAVEGACIÃ“N HORIZONTAL ---
    const sections = $('#invitation-main .section');
    let currentSectionIndex = 0;
    let isTransitioning = false;

    function getPageTurnDurationMs() {
        const raw = getComputedStyle(document.documentElement).getPropertyValue('--page-turn-duration-ms').trim();
        const parsed = parseInt(raw, 10);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : 1000;
    }

    $('#next-btn').on('click', function () {
        if (!isTransitioning && currentSectionIndex < sections.length - 1) { changeSection(currentSectionIndex + 1); }
    });

    $('#prev-btn').on('click', function () {
        if (!isTransitioning && currentSectionIndex > 0) { changeSection(currentSectionIndex - 1); }
    });

    function changeSection(newIndex) {
        if (isTransitioning || newIndex === currentSectionIndex || newIndex < 0 || newIndex >= sections.length) {
            return;
        }

        const currentSection = $(sections[currentSectionIndex]);
        const newSection = $(sections[newIndex]);
        const goingNext = newIndex > currentSectionIndex;
        const transitionDuration = getPageTurnDurationMs();
        let finalized = false;

        isTransitioning = true;
        updateNavButtons();

        // Limpiar animaciones internas antes de empezar
        currentSection.find('.animate__animated').removeClass('animate__fadeInDown animate__zoomIn animate__fadeInUp animate__fadeIn');
        newSection.find('.animate__animated').css('opacity', 0);

        if (goingNext) {
            // Ir adelante: La actual gira a la izquierda
            newSection.addClass('is-active turn-in-next');
            currentSection.addClass('turn-out-next');
        } else {
            // Ir atrás: La nueva (previa) gira desde la izquierda hacia el centro
            newSection.addClass('is-active turn-in-prev from-left');
            currentSection.addClass('turn-out-prev');

            // Forzar reflow para que el 'from-left' (-180deg) se aplique antes de quitarlo
            void newSection[0].offsetWidth;

            setTimeout(() => {
                newSection.removeClass('from-left');
            }, 50);
        }

        const finalizeTransition = () => {
            if (finalized) return;
            finalized = true;

            // Limpieza total de clases de estado anterior
            sections.removeClass('turn-out-next turn-out-prev turn-in-next turn-in-prev from-left is-active');
            newSection.addClass('is-active');

            currentSectionIndex = newIndex;
            isTransitioning = false;
            updateNavButtons();

            // Lógica para re-inicializar el carrusel 3D si se navega a la sección 'momentos'
            if (newSection.attr('id') === 'momentos') {
                if (!carouselInitialized) {
                    createCarouselItems();
                }
                setTimeout(() => {
                    ensureCarouselVisible();
                }, 120);
            }

            if (newSection.attr('id') === 'confirmacion') {
                setupConfirmacion();
            }

            animateSectionContent(newSection);
        };

        // Esperar a que termine la transición de CSS
        setTimeout(finalizeTransition, transitionDuration + 50);
    }

    function updateNavButtons() {
        $('#prev-btn').prop('disabled', isTransitioning || currentSectionIndex === 0);
        $('#next-btn').prop('disabled', isTransitioning || currentSectionIndex === sections.length - 1);
        $('#next-btn').toggleClass('hint-next', !isTransitioning && currentSectionIndex < sections.length - 1);
    }

    function animateSectionContent(section) {
        section.find('.animate__animated')
            .css('opacity', 0)
            .removeClass('animate__fadeInDown animate__zoomIn animate__fadeInUp animate__fadeIn');

        // Fuerza reflow para reiniciar animaciones de animate.css al volver a una secciÃ³n.
        if (section.length) {
            void section[0].offsetWidth;
        }

        const animations = [
            { selector: '.presentation-title', animation: 'animate__fadeInDown', delay: '0.5s' },
            { selector: '.presentation-photo', animation: 'animate__zoomIn', delay: '0.8s' },
            { selector: '.fifteen-number-container', animation: 'animate__fadeInUp', delay: '1.2s' },
            { selector: '.section-title', animation: 'animate__fadeInDown', delay: '0.5s' },
            { selector: '.carousel-container', animation: 'animate__zoomIn', delay: '1s' },
            { selector: '.cursive-text', animation: 'animate__fadeIn', delay: '0.5s' },
            { selector: '#event-countdown', animation: 'animate__fadeInUp', delay: '1.5s' },
            { selector: '.main-invite-text', animation: 'animate__zoomIn', delay: '0.5s' },
            { selector: '.address-text', animation: 'animate__zoomIn', delay: '1s' },
            { selector: '.gift-text', animation: 'animate__fadeIn', delay: '0.5s' },
            { selector: '.confirmation-text', animation: 'animate__fadeIn', delay: '0.5s' }
        ];

        setTimeout(() => {
            animations.forEach(item => {
                const el = section.find(item.selector);
                if (el.length) {
                    el.css({ 'opacity': 1, 'animation-delay': item.delay }).addClass(item.animation);
                }
            });
        }, 120);
    }


    // --- CONTEO REGRESIVO DEL EVENTO Y MUSICA ---
    // (Esta parte del codigo no ha cambiado)
    const eventDate = new Date("May 23, 2026 18:00:00").getTime();
    setInterval(function () {
        const now = new Date().getTime();
        const distance = eventDate - now;
        $('#days').text(Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'));
        $('#hours').text(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'));
        $('#minutes').text(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'));
        $('#seconds').text(Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'));
    }, 1000);

    $('#music-btn').on('click', function () {
        if (music.paused) { music.play(); $(this).addClass('playing'); }
        else { music.pause(); $(this).removeClass('playing'); }
    });

    // Configurar seccion de confirmacion con cupos
    function setupConfirmacion() {
        const cupos = window.cuposInvitacion;
        const numeroCupos = $('#numero-cupos');
        const cuposInfo = $('#cupos-info');
        const whatsappLink = $('#whatsapp-link');

        if (cupos && cupos !== '') {
            numeroCupos.text(cupos);
            cuposInfo.show();
        } else {
            cuposInfo.hide();
        }

        // Mensaje exacto solicitado para WhatsApp, con nombre e hiperlink actual
        const nombre = decodeURIComponent(getUrlParameter('familia') || 'Invitado');
        const enlace = window.location.href;
        const mensaje = `Oye¸ ¡Estás invitado a mis 15 Años! \n\nHola ${nombre}\n\nQueremos Compartir Contigo este momento tan especial. Por favor abre el Enlace:\n\n${enlace}\n\nPor favor, confirma tu asistencia en la invitación digital. ¡Te esperamos! \n\nCon cariño,\nMichell calderon`;
        const urlWhatsapp = `https://wa.me/3137087635?text=${encodeURIComponent(mensaje)}`;
        whatsappLink.attr('href', urlWhatsapp);
    }
});
