-- Lote 10: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C073-0153','ADO DEL DIÁMETRO (S = π·D²/4):',' si se DUPLICA LA VELOCIDAD, se DUPLICA el caudal; si se DUPLICA EL DIÁMETRO, el caudal se CUADRIPLICA.'),
('C073-0156','LOCIDAD, se DUPLICA el caudal;',' si se DUPLICA EL DIÁMETRO, el caudal se CUADRIPLICA.'),
('C073-0158','N y su DENSIDAD en cada punto:',' lo hace la ECUACIÓN DE NAVIER-STOKES, compleja y con demasiadas variables para los cálculos «cotidianos» de los bomberos.'),
('C073-0162','izar TRABAJO), en TRES FORMAS:',' ENERGÍA DE PRESIÓN, ENERGÍA CINÉTICA y ENERGÍA POTENCIAL: E_T = E_pre + E_c + E_P; por lo que E_T1 = E_T2.'),
('C073-0165','re), también ENERGÍA DE FLUJO:',' aquella a la que está sometido el fluido y gracias a la cual genera un trabajo (W): E_pre = W = F·d; como F = P·S, E_pre = P·S·d; y como V = S·d: E_pre = P·V.
B) ENERGÍA CINÉTICA (E_c): por tener masa y estar en movimiento: E_c = ½·m·v²; sustituyendo la masa por volumen por densidad: E_c = ½·V·ρ·v².'),
('C073-0167','la cual genera un trabajo (W):',' E_pre = W = F·d; como F = P·S, E_pre = P·S·d; y como V = S·d: E_pre = P·V.
B) ENERGÍA CINÉTICA (E_c): por tener masa y estar en movimiento: E_c = ½·m·v²; sustituyendo la masa por volumen por densidad: E_c = ½·V·ρ·v².'),
('C073-0169','er masa y estar en movimiento:',' E_c = ½·m·v²; sustituyendo la masa por volumen por densidad: E_c = ½·V·ρ·v².'),
('C073-0170','ltura superior a la COTA CERO:',' E_P = m·g·h; sustituyendo: E_P = V·ρ·g·h.'),
('C073-0174','xpresadas en METROS (ALTURAS):',' B[m] = P/γ + v²/2g + h, siendo B el NÚMERO DE BERNOULLI (m); P/γ la ALTURA DE PRESIÓN (m); v²/2g la ALTURA CINÉTICA (m); h la ALTURA GEOMÉTRICA (m); P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0175',' B el NÚMERO DE BERNOULLI (m);',' P/γ la ALTURA DE PRESIÓN (m); v²/2g la ALTURA CINÉTICA (m); h la ALTURA GEOMÉTRICA (m); P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0176','P/γ la ALTURA DE PRESIÓN (m);',' v²/2g la ALTURA CINÉTICA (m); h la ALTURA GEOMÉTRICA (m); P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0177','v²/2g la ALTURA CINÉTICA (m);',' h la ALTURA GEOMÉTRICA (m); P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0178','h la ALTURA GEOMÉTRICA (m);',' P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0183','iscosidad del agua NO ES NULA:',' un problema más para conseguir los caudales recomendables con la presión necesaria y el efecto extintor deseado.'),
('C073-0185','A y la ABSORBIDA POR UN MOTOR:',' E₁ + H_b = E₂ + H_f + H_m (E₁ y E₂ energía en dos puntos de la instalación; H_b energía aportada por una bomba; H_f pérdidas de carga; H_m energía absorbida por un motor).'),
('C073-0189','RA UNA INSTALACIÓN HIDRÁULICA:',' P₁ + ½ρv₁² + ρgh₁ + H_b − H_f − H_m = P₂ + ½ρv₂² + ρgh₂ (en la imagen el primer término cinético lleva una «g» de más: D-161).'),
('C073-0191','mplifica eliminando H_b y H_m;',' el principal cambio respecto a Bernoulli es la inclusión de las PÉRDIDAS DE CARGA: las PÉRDIDAS DE PRESIÓN que se producen a medida que el fluido avanza por la instalación.'),
('C073-0195',' y CONSIGO MISMO (viscosidad);',' CONSTANTES a lo largo de la instalación si no varían sus características ni las del fluido.'),
('C073-0200','MÁS UTILIZADA, DARCY-WEISBACH:',' en función de la velocidad H_f = f · L·v² / (D·2g); como en los cálculos de bomberos es difícil conocer la velocidad, en función del CAUDAL: H_f = f · 8·L·Q² / (π²·g·D⁵).'),
('C073-0201','cidad H_f = f · L·v² / (D·2g);',' como en los cálculos de bomberos es difícil conocer la velocidad, en función del CAUDAL: H_f = f · 8·L·Q² / (π²·g·D⁵).'),
('C073-0208','/(gπ²D⁵). FACTOR C aproximado:',' Ø 25 mm → 380 · Ø 38 mm → 38 · Ø 45 mm → 17 · Ø 70 mm → 2,1.'),
('C073-0214','ero de la ecuación se lee que:',' las pérdidas de carga son DIRECTAMENTE PROPORCIONALES a la LONGITUD; DIRECTAMENTE PROPORCIONALES al CUADRADO DEL CAUDAL; INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C073-0216','ONALES al CUADRADO DEL CAUDAL;',' INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C073-0218','ONALES al CUADRADO DEL CAUDAL;',' INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C073-0219',' PROPORCIONALES a la LONGITUD;',' DIRECTAMENTE PROPORCIONALES al CUADRADO DEL CAUDAL; INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C073-0220','45 mm ≈ 3,4 bar a 1000 lpm;',' 70 mm casi plana (≈ 0,4 bar a 1000 lpm).'),
('C073-0222','risa (≈ 19 bar hacia 500 lpm);',' 45 mm ≈ 3,4 bar a 1000 lpm; 70 mm casi plana (≈ 0,4 bar a 1000 lpm).'),
('C073-0241','LES, LOCALIZADAS o SINGULARES;',' sumadas a las continuas dan las PÉRDIDAS DE CARGA TOTALES.'),
('C073-0244','CONTINUAS son MÁS IMPORTANTES;',' las singulares pueden DESPRECIARSE cuando supongan MENOS DEL 5 % de las totales y, en la práctica, cuando la LONGITUD ENTRE SINGULARIDADES sea MAYOR DE MIL VECES EL DIÁMETRO INTERIOR.'),
('C073-0248','erminan de forma EXPERIMENTAL;',' como se deben a disipación de energía por turbulencias, se expresan en función de la ENERGÍA CINÉTICA corregida por un COEFICIENTE EMPÍRICO K, ADIMENSIONAL, que depende del TIPO DE SINGULARIDAD y de la VELOCIDAD MEDIA en la tubería.'),
('C073-0252','NEAS DE ATAQUE independientes;',' muy usada en incendios de interior: el BINOMIO DE LANCEROS trabaja con una línea y el resto de la dotación permanece en el RELLANO con la otra por si fuera necesaria.'),
('C073-0256','empre que haya 7 BAR EN PUNTA:',' con MÁS de 7 bar, MÁS caudal; con MENOS, MENOS caudal.'),
('C073-0258','por la otra; pero SÍ SALE MÁS:',' al cerrar una lanza, por el tramo de alimentación deja de circular su caudal; el caudal total se reduce a CERCA DE LA MITAD; DESCIENDEN LAS PÉRDIDAS DE CARGA en el tramo de alimentación; llega MÁS PRESIÓN a la lanza abierta y su CAUDAL AUMENTA.'),
('C073-0259','se reduce a CERCA DE LA MITAD;',' DESCIENDEN LAS PÉRDIDAS DE CARGA en el tramo de alimentación; llega MÁS PRESIÓN a la lanza abierta y su CAUDAL AUMENTA.'),
('C073-0261','cio y de la presión en lanza);',' puede ser SIGNIFICATIVO: los lanceros deben COMUNICARSE y AVISARSE antes de cerrar.'),
('C073-0269','nuidad), AUMENTA LA VELOCIDAD;',' por Bernoulli, al aumentar la ENERGÍA CINÉTICA DESCIENDE LA PRESIÓN ESTÁTICA, generando una diferencia de presión.'),
('C073-0274','ción de mangueras presurizada;',' se aplica Bernoulli antes y después del orificio (B₁ = B₂).'),
('C073-0275','dad nula dentro del depósito);',' altura geométrica: se simplifica (igual en 1 y 2).'),
('C073-0284','ético en 1, este se DESPRECIA:',' v₂ = √(2g·P_E1) (ECUACIÓN DE LA DESCARGA PARA UNA INSTALACIÓN PRESURIZADA).'),
('C073-0286','v₂²/2g → v₂² = v₁² + 2·g·P_E1;',' como el término de presión estática es MUY SUPERIOR al cinético en 1, este se DESPRECIA: v₂ = √(2g·P_E1) (ECUACIÓN DE LA DESCARGA PARA UNA INSTALACIÓN PRESURIZADA).'),
('C073-0288','E, también PULSO DE ZHUKOWSKI,',' es una SOBREPRESIÓN y DEPRESIÓN CONSECUTIVAS que se forma en una tubería al VARIAR BRUSCAMENTE EL CAUDAL.'),
('C073-0300','ONES de temperatura y presión;',' referencia: el AGUA.'),
('C073-0312','YE al aumentar la temperatura;',' en los GASES, tendencia INVERSA.'),
('C073-0317',' SENTIDO CONTRARIO (reacción):',' el RETROCESO que genera el agua al salir por la boquilla.'),
('C073-0321',' presión en lanza sea 7 BARES:',' la reacción es simplemente el 6 % DEL VALOR SELECCIONADO EN EL SELECTOR DE CAUDAL.'),
('C073-0325','R = 1,57 · P_L · Ø² (R en kg;',' Ø diámetro, que el manual da «en cm²»: D-163; P_L en kg/cm²).'),
('C073-0332','kg con 475 (≈ 6 % del caudal);',' la curva automática pasa por esos cuatro puntos.'),
('C073-0334','recipiente adoptando su forma;',' un LÍQUIDO se deforma bajo la acción de SU PROPIO PESO ocupando total o parcialmente el recipiente.'),
('C073-0354',' PROPORCIONALES a la LONGITUD;',' DIRECTAMENTE PROPORCIONALES al CUADRADO DEL CAUDAL; INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C073-0355','CONTINUAS son MÁS IMPORTANTES;',' las singulares pueden DESPRECIARSE cuando supongan MENOS DEL 5 % de las totales y, en la práctica, cuando la LONGITUD ENTRE SINGULARIDADES sea MAYOR DE MIL VECES EL DIÁMETRO INTERIOR.'),
('C073-0356','A en el tramo de alimentación;',' llega MÁS PRESIÓN a la lanza abierta y su CAUDAL AUMENTA.'),
('C073-0363',' presión en lanza sea 7 BARES:',' la reacción es simplemente el 6 % DEL VALOR SELECCIONADO EN EL SELECTOR DE CAUDAL.'),
('C073-0366','e agua sino la de la MANGUERA:',' PRESIÓN EN BOMBA MENOS PÉRDIDAS DE CARGA.'),
('C073-0376','ica); altura cinética = v²/2g;',' altura geométrica: se simplifica.'),
('C073-0381','sultante es S₂/S₁ VECES mayor:',' el cociente entre secciones es la relación entre fuerza ejercida y resultante; con S₂ mucho mayor que S₁ se MULTIPLICA la fuerza.'),
('C073-0397',' en bomba − pérdidas de carga;',' E_c1 = v₁²/2g; E_P1 se simplifica.'),
('C073-0410',' la PRESIÓN ESTÁTICA ABSOLUTA:',' p₁ = p atm + ρgh₁; p₂ = p atm + ρgh₂; y la diferencia NO CAMBIA: p₁ − p₂ = ρg(h₁ − h₂).'),
('C073-0417','ltura superior a la COTA CERO:',' E_P = m·g·h; sustituyendo: E_P = V·ρ·g·h.'),
('C073-0418','RA UNA INSTALACIÓN HIDRÁULICA:',' P₁ + ½ρv₁² + ρgh₁ + H_b − H_f − H_m = P₂ + ½ρv₂² + ρgh₂ (en la imagen el primer término cinético lleva una «g» de más: D-161).'),
('C073-0419','ombas ni motores intercalados:',' la ecuación de la energía se simplifica eliminando H_b y H_m; el principal cambio respecto a Bernoulli es la inclusión de las PÉRDIDAS DE CARGA: las PÉRDIDAS DE PRESIÓN que se producen a medida que el fluido avanza por la instalación.'),
('C073-0426',' LA VARIACIÓN DE SU VELOCIDAD:',' FLUJO PERMANENTE (o ESTACIONARIO): las condiciones de VELOCIDAD en cualquier punto NO CAMBIAN CON EL TIEMPO, o las variaciones son pequeñas respecto a los valores medios; tampoco hay cambios de densidad, presión o temperatura con el tiempo.'),
('C073-0432','DAD discurre de forma CAÓTICA;',' partículas desordenadas que chocan y forman REMOLINOS; líneas de corriente predecibles solo hasta cierto punto.'),
('C073-0435',' B el NÚMERO DE BERNOULLI (m);',' P/γ la ALTURA DE PRESIÓN (m); v²/2g la ALTURA CINÉTICA (m); h la ALTURA GEOMÉTRICA (m); P/γ + h la ALTURA PIEZOMÉTRICA (m).'),
('C073-0436','iscosidad del agua NO ES NULA:',' un problema más para conseguir los caudales recomendables con la presión necesaria y el efecto extintor deseado.'),
('C073-0443',' presión en lanza sea 7 BARES:',' la reacción es simplemente el 6 % DEL VALOR SELECCIONADO EN EL SELECTOR DE CAUDAL.'),
('C073-0459','ONALES al CUADRADO DEL CAUDAL;',' INVERSAMENTE PROPORCIONALES a la QUINTA POTENCIA DEL DIÁMETRO.'),
('C074-0046','AS FIJAS alrededor del rodete;',' REDUCE LA VELOCIDAD del fluido a la salida del rodete transformando esa reducción en AUMENTO DE PRESIÓN; hace el flujo más controlado, aumenta la tasa de conversión de energía y hace la bomba MÁS EFICAZ.'),
('C074-0047','ducción en AUMENTO DE PRESIÓN;',' hace el flujo más controlado, aumenta la tasa de conversión de energía y hace la bomba MÁS EFICAZ.'),
('C074-0050','duce a la SECCIÓN DE SALIDA S;',' en ella parte de la energía cinética se transforma en presión a medida que AUMENTA SU SECCIÓN hasta S, con la consiguiente reducción de velocidad.'),
('C074-0052','también CARACOL por su forma):',' RECOGE el fluido a la salida del difusor (o del rodete si no hay difusor) y lo conduce a la SECCIÓN DE SALIDA S; en ella parte de la energía cinética se transforma en presión a medida que AUMENTA SU SECCIÓN hasta S, con la consiguiente reducción de velocidad.'),
('C074-0089','rte se convierte en VELOCIDAD;',' con sección constante, más caudal = más velocidad (continuidad) = más ENERGÍA CINÉTICA; como la suma es constante, DISMINUYE LA ESTÁTICA.'),
('C074-0114','ORES CAUDALES A MENOR PRESIÓN;',' habitualmente solo la ETAPA DE BAJA (MONOCELULARES).'),
('C074-0116','funciona como una MONOCELULAR;',' en ALTA, la SALIDA DEL RODETE DE BAJA COINCIDE CON LA ENTRADA DEL DE ALTA, que recoge el agua y le añade aún más MOMENTO CINÉTICO; aumenta la energía cinética que después se convierte en PRESIÓN.'),
('C074-0123','o es la SUMA DE TRES FACTORES:',' PRESIÓN EN LANZA (P_L), ALTURA GEOMÉTRICA (H) desde la cota de la bomba hasta la de la punta de lanza y PÉRDIDAS DE CARGA (P_C): P_B = P_L + H + P_C.'),
('C074-0127','AS: h localizadas = ΣK_acc·Q²;',' luego P_C = (8fL/π²gD⁵ + ΣK_acc)·Q² = K·Q².'),
('C074-0198','LOCIDAD y su ENERGÍA CINÉTICA;',' hay además una PÉRDIDA DE CARGA PUNTUAL; la ENERGÍA POTENCIAL no varía (misma cota a la entrada y a la salida).'),
('C074-0200','SCIENDE LA ENERGÍA DE PRESIÓN;',' si llega a la PRESIÓN DE VAPOR a esa temperatura, se forman burbujas que, al salir del estrechamiento, se DEFORMAN al aumentar la presión y finalmente IMPLOSIONAN (figura «Cavitación y Teorema de conservación de la energía de Bernoulli»: energía potencial + de presión + cinética + pérdida de carga = constante).'),
('C074-0203','ÍNIMA PRESIÓN SOBRE EL RODETE;',' superada esa zona el rodete comunica energía, SUBE LA PRESIÓN y CONDENSA las burbujas.'),
('C074-0224','r a la temperatura de trabajo;',' D-171); en primera aproximación (6) p_atm/γ − h_E − v_E²/2g − K·Q² > p_v.'),
('C074-0260','LENAR LA CUBA por aspiración);',' no para refrigerar SALVO A BAJAS REVOLUCIONES (presiones INFERIORES A 5 BAR).'),
('C074-0263','AS FIJAS alrededor del rodete;',' REDUCE LA VELOCIDAD del fluido a la salida del rodete transformando esa reducción en AUMENTO DE PRESIÓN; hace el flujo más controlado, aumenta la tasa de conversión de energía y hace la bomba MÁS EFICAZ.'),
('C074-0266','CRECE con Q; la P CRECE con Q;',' el η crece hasta un MÁXIMO (η max) y luego cae.'),
('C074-0271',' en forma de PRESIÓN ESTÁTICA;',' al abrir, parte se convierte en VELOCIDAD; con sección constante, más caudal = más velocidad (continuidad) = más ENERGÍA CINÉTICA; como la suma es constante, DISMINUYE LA ESTÁTICA.'),
('C074-0284','la estática pasa a velocidad):',' trabajando a 230 l/min ya no habrá 20 bar sino bastante menos, y con ese valor hay que vencer PÉRDIDAS DE CARGA, ALTURA GEOMÉTRICA y dar 7 BAR EN LANZA (diámetro de gota óptimo).'),
('C074-0339','duce a la SECCIÓN DE SALIDA S;',' en ella parte de la energía cinética se transforma en presión a medida que AUMENTA SU SECCIÓN hasta S, con la consiguiente reducción de velocidad.'),
('C075-0021','imponga requisitos diferentes:','
a) La distancia de recorrido real, medida horizontalmente, a cualquier hidrante será inferior a 100 m en zonas urbanas y a 40 m en el resto.'),
('C075-0073','000 m2 adicionales o fracción:','
- Residencial Vivienda: entre 5.000 y 10.000 m2.
- Administrativo: entre 5.000 y 10.000 m2.
- Docente: entre 5.000 y 10.000 m2.
- Residencial Público: entre 2.000 y 10.000 m2.
- Hospitalario: entre 2.000 y 10.000 m2.
- Comercial: entre 1.000 y 10.000 m2.
- Aparcamiento: entre 1.000 y 10.000 m2.
- Pública concurrencia: en cines, teatros, auditorios y discotecas con superficie construida entre 500 y 10.000 m2, y en…'),
('C075-0074',' bloque de dotación del DB-SI:',' EN ESTABLECIMIENTOS INDUSTRIALES CON SUPERFICIE DE SECTOR DE INCENDIOS IGUAL O SUPERIOR A LOS 300 m2.'),
('C075-0178',' que expresa esta relación es:','
Q = K √P'),
('C075-0202','SO, con equipos de tipo 25 mm:','
- Hospitalario: en todo caso.
- Comercial: si la superficie construida excede de 500 m2.
- Pública concurrencia: si la superficie construida excede de 500 m2.
- Aparcamiento: si la superficie construida excede de 500 m2, excluidos los robotizados.
- Residencial Público: si la superficie construida excede de 1.000 m2 o el establecimiento está previsto para dar alojamiento a más de 50 personas.
- Ad'),
('C075-0265','ta las condiciones siguientes:','
- Siempre que sea posible, se instalarán EN EL INTERIOR DE LOS EDIFICIOS.
- En PARAMENTOS Y PILARES, con el CENTRO A 1,5 m DEL SUELO COMO MÁXIMO.
- En las BIE DE 25 esta altura se entenderá para la BOQUILLA Y VÁLVULA MANUAL, pero EL SOPORTE PUEDE ESTAR MÁS ALTO.
- Se situarán, SIEMPRE QUE SEA POSIBLE, a una distancia máxima de 5 m de las salidas de cada sector de incendio, sin que constituyan obst'),
('C075-0267','isposiciones de normalización:',' CÓDIGO TÉCNICO DE EDIFICACIÓN (RD 314/2006), REGLAMENTO DE INSTALACIONES DE PROTECCIÓN CONTRA INCENDIOS («RD 517/2017», literal del PDF) y REGLAMENTO DE SEGURIDAD CONTRA INCENDIOS EN LOS ESTABLECIMIENTOS INDUSTRIALES (RD 2267/04), MODIFICADO POR RD 560/2010, y la Guía Técnica de aplicación del RSCIEI.'),
('C075-0269','ja otras exigencias del DB-SI:','
- Las superficies máximas de los sectores de incendio de la tabla 1.1 pueden duplicarse cuando estén protegidos con una instalación automática de extinción.'),
('C075-0272','ación y regulación del chorro:',' CIERRE, AGUA PULVERIZADA y CHORRO LLENO.'),
('C075-0274','ontaje según su configuración:',' EN UNA HORNACINA CON TAPA (CONFIGURACIÓN A), EN UN ARMARIO EMPOTRADO (CONFIGURACIÓN B) y EN UN ARMARIO DE SUPERFICIE (CONFIGURACIÓN C).'),
('C075-0277','el número de plazas siguiente:','
- Una para usuario de silla de ruedas por cada 100 ocupantes o fracción.
- Excepto en uso Residencial Vivienda, una para persona con otro tipo de movilidad reducida por cada 33 ocupantes o fracción.'),
('C075-0289','nguera, de uno de estos tipos:',' TIPO 1, DEVANADERA GIRATORIA; TIPO 2, soporte con la manguera enrollada en PLEGADO DOBLE; TIPO 3, soporte con la manguera plegada en ZIGZAG.'),
('C076-0008','ÓN DE EMERGENCIA se divide en:','
- ALUMBRADO DE SEGURIDAD, que comprende: alumbrado de RUTAS DE EVACUACIÓN, alumbrado ANTIPÁNICO (el PDF escribe «Antipático») y alumbrado de ZONAS DE ALTO RIESGO.
- ALUMBRADO DE REEMPLAZAMIENTO.'),
('C076-0073','s en la atmósfera (AEROSOLES):','
- Iónicos: se activan por la influencia de los productos de la combustión sobre la corriente eléctrica generada en una cámara de ionización.
- Ópticos: se activan por la influencia de los productos de la combustión sobre el flujo (oscurecimiento) o la difusión de la luz (efecto Tyndall) en las zonas infrarroja, visible o ultravioleta.'),
('C076-0133','ación, acceso o mantenimiento:',' CUADROS ELÉCTRICOS, SUELOS TÉCNICOS, INTERIORES DE EQUIPOS, CÁMARAS FRIGORÍFICAS, TRAZADO DE TÚNELES, e instalaciones cuya complejidad no permite detectores puntuales.'),
('C076-0140','ara usa una LUZ LÁSER ESTABLE;',' otros se basan en CONTADORES DE PARTÍCULAS como la CÁMARA DE NIEBLA DE WILSON y la de IONIZACIÓN LINEAL.'),
('C076-0145','tores en zonas de riesgo alto;',' si excede de 5.000 m2, en todo el edificio.'),
('C076-0159','del DB-SI, según su ANEJO SI A',': «Sistema que permite DETECTAR UN INCENDIO EN EL TIEMPO MÁS CORTO POSIBLE y EMITIR LAS SEÑALES DE ALARMA Y DE LOCALIZACIÓN ADECUADAS para que puedan adoptarse las medidas apropiadas».'),
('C076-0268','a la elevación de temperatura:','
- Termostáticos: se activan cuando la temperatura ambiente excede de un cierto valor durante un tiempo suficiente.
- Termovelocimétricos: se activan cuando la velocidad de aumento de temperatura excede de un cierto valor durante un tiempo suficiente.
- Combinados: incorporan un elemento termostático y otro velocimétrico.'),
('C076-0270','RES CARACTERÍSTICAS DEL FUEGO:',' EL HUMO, EL CALOR Y LA RADIACIÓN (LLAMA).'),
('C076-0271','ión según el fuego previsible:',' en combustión lenta, como productos de cartón, funcionará antes un detector de humos; en fuego que desprende calor con rapidez y poco humo, antes el de calor; en líquido inflamable, el de llama.'),
('C076-0274','abajo, el tipo de detección:','
1. GAS DE COMBUSTIÓN → DETECCIÓN IÓNICA.
2. HUMOS VISIBLES → DETECCIÓN ÓPTICA.
3. LLAMAS → DETECCIÓN DE LLAMAS.
4. CALOR → DETECCIÓN TERMOVELOCIMÉTRICA.
5. CALOR → DETECCIÓN TERMOSTÁTICA.'),
('C076-0283','A TEÓRICA MÁXIMA DE COBERTURA:',' 1.600 m2, aunque la geometría del recinto puede limitarla.'),
('C076-0284',' DE HUMO POR ASPIRACIÓN (ASD):',' se recurre a ella cuando los detectores puntuales pueden verse afectados por BOLSAS DE AIRE SOBRECALENTADAS, CORRIENTES DE AIRE, VENTILACIÓN FORZADA u OBSTÁCULOS que impiden el acceso del humo.'),
('C076-0285','Especialmente indicada para:','
- Zonas de DIFÍCIL ACCESO (túneles, canales, sistemas de ventilación, zonas excesivamente elevadas).
- Zonas de SUPERFICIE TAN GRANDE que los puntuales serían prohibitivos (CENTROS COMERCIALES, ZONAS DE ALMACENAJE).
- CUADROS DE CONTROL: eléctricos, de proceso de datos, de comunicaciones.'),
('C076-0286','a esencialmente de DOS PARTES:',' la TUBERÍA o red de tuberías de aspiración con pequeños ORIFICIOS CALIBRADOS o puntos de muestreo, y la CÁMARA DE DETECCIÓN, que contiene un FILTRO de separación de partículas de polvo, un DETECTOR ÓPTICO DE HUMO, una BOMBA DE ASPIRACIÓN y una UNIDAD ELECTRÓNICA DE EVALUACIÓN.'),
('C076-0293','o mínimo con medios acústicos:',' timbres o sirenas de alarma, o un sistema de megafonía.'),
('C076-0299','AJE DE VOZ, se ha de asegurar:','
- Que la alarma pueda ser transmitida AUTOMÁTICAMENTE en respuesta a una señal de incendios: la transmisión NO DEBE DEPENDER DE LA PRESENCIA DE UN OPERADOR.
- Que todos los mensajes sean CLAROS, BREVES, INEQUÍVOCOS y, en la medida de lo posible, PLANIFICADOS CON ANTERIORIDAD.
- Que el mensaje recibido sea COMPRENSIBLE.
- Que el INTERVALO ENTRE MENSAJES SUCESIVOS NO SUPERE LOS 30 SEGUNDOS.
- El ACC'),
('C076-0312','ada uno en su propio epígrafe:','
7. Sistemas fijos de extinción por rociadores automáticos y agua pulverizada.
8. Sistemas fijos de extinción por agua nebulizada.
9. Sistemas fijos de extinción por espuma física.
10. Sistemas fijos de extinción por polvo.
11. Sistemas fijos de extinción por agentes extintores gaseosos.
12. Sistemas fijos de extinción por aerosoles condensados.
16. Sistemas fijos de extinción en cocinas comerciales.'),
('C076-0320','cado en los siguientes puntos:','
1. En cada PUERTA DE SALIDA que deba ser utilizada en caso de emergencia.
2. A MENOS DE 2 m DE LAS ESCALERAS, de manera que CADA TRAMO RECIBA LUZ DIRECTA.
3. A MENOS DE 2 m DE CUALQUIER CAMBIO DE NIVEL.
4. SALIDAS DE EMERGENCIA Y SEÑALIZACIÓN DE SEGURIDAD OBLIGATORIAS.
5. En cada CAMBIO DE DIRECCIÓN.
6. En cada CRUCE DE PASILLOS.
7. FUERA DEL EDIFICIO Y CERCA DE CADA SALIDA FINAL.
8. A MENOS DE 2'),
('C076-0328','s, las siguientes condiciones:','
ABARCAR, siempre que sea posible, LA UNIDAD DE RIESGO EN SU TOTALIDAD, entendida como el edificio o conjunto de edificios que pueden ser afectados por un mismo incendio.'),
('C077-0032',' uno o más de estos OBJETIVOS:','
- Garantizar una PRONTA RESPUESTA arrojando una cantidad de agua predeterminada, según pautas establecidas, sobre una zona prevista, para CONTROLAR O EXTINGUIR el incendio.
- ENFRIAR una instalación que, afectada por el calor (por lo general irradiado, pero no exclusivamente), agravaría la situación al provocar EXPLOSIONES, COLAPSO ESTRUCTURAL, LIBERACIÓN DE PRODUCTOS COMBUSTIBLES u otros efectos.'),
('C077-0033',' uno o más de estos OBJETIVOS:','
- Garantizar una PRONTA RESPUESTA arrojando una cantidad de agua predeterminada, según pautas establecidas, sobre una zona prevista, para CONTROLAR O EXTINGUIR el incendio.
- ENFRIAR una instalación que, afectada por el calor (por lo general irradiado, pero no exclusivamente), agravaría la situación al provocar EXPLOSIONES, COLAPSO ESTRUCTURAL, LIBERACIÓN DE PRODUCTOS COMBUSTIBLES u otros efectos.'),
('C077-0104','efecto sobre la capa de ozono:','
- Argón: mismas características que el CO2, empleando un gas noble incoloro, inodoro e insípido. Destaca por su estabilidad a muy altas temperaturas y por no ser tóxico.
- Mezclas de gases: por COMBINACIÓN DE VARIOS AGENTES EXTINTORES GASEOSOS se consigue reunir en un solo agente LOS MECANISMOS DE EXTINCIÓN DE CADA UNO de sus componentes. Ejemplos: INERGEN (52 % nitrógeno, 40 % argón y 8 % dióxido'),
('C077-0117','uego, según la norma UNE-EN 2:','
Clase A: fuegos de materiales sólidos, generalmente de naturaleza orgánica, cuya combustión se realiza normalmente con formación de brasas.'),
('C078-0014','e la cadena extrahospitalaria:','
1. Prevención y preparación.
2. Activación del sistema de respuesta a emergencias.
3. RCP de alta calidad.
4. Desfibrilación con DEA.
5. Intervenciones de soporte vital avanzado.
6. Cuidados posparo cardíaco.
7. Recuperación.'),
('C078-0091','quieren actuaciones distintas:',' desvanecimiento, accidente cerebrovascular, ataque cardíaco, convulsiones o sobredosis de fármacos.'),
('C079-0007','determina qué camino se sigue:','
A) MECANISMO GENERALIZADO Y PELIGROSO (accidente de vehículo de motor, precipitación desde altura), o paciente inconsciente con mecanismo desconocido:
→ Se AMPLÍA la Evaluación Primaria con una valoración rápida de cabeza, cuello, tórax, abdomen, pelvis, extremidades y espalda, realizando las intervenciones críticas necesarias antes del traslado.'),
('C079-0008','nte con mecanismo desconocido:','
→ Se AMPLÍA la Evaluación Primaria con una valoración rápida de cabeza, cuello, tórax, abdomen, pelvis, extremidades y espalda, realizando las intervenciones críticas necesarias antes del traslado.'),
('C079-0009','nte con mecanismo desconocido:','
→ Se AMPLÍA la Evaluación Primaria con una valoración rápida de cabeza, cuello, tórax, abdomen, pelvis, extremidades y espalda, realizando las intervenciones críticas necesarias antes del traslado.'),
('C079-0013',' por arma blanca en el tórax):','
→ Evaluación Inicial y EXPLORACIÓN ENFOCADA dirigida a la zona de la lesión.'),
('C079-0019','inco apartados, en este orden:','
1. IMPRESIÓN GENERAL DEL PACIENTE.
2. EVALUACIÓN INICIAL DEL NIVEL DE CONSCIENCIA, CON ESTABILIZACIÓN DE LA COLUMNA.
3. VALORACIÓN DE LA VÍA AÉREA.
4. VALORACIÓN DE LA RESPIRACIÓN.
5. VALORACIÓN DE LA CIRCULACIÓN.'),
('C079-0033','ica con la denominación C-ABC:','
- Impresión general.
- C: control de hemorragias externas.
- Nivel de consciencia, mediante la regla AVDN (Alerta, Verbal, Dolor, No responde).
- A: vía aérea.
- B: respiración.
- C: circulación.'),
('C079-0055',') consta de CINCO COMPONENTES:','
1. TABLA LARGA O TABLA ESPINAL. Su finalidad es evitar el movimiento de la columna vertebral.'),
('C079-0088','iento de la PUNTA DE LOS PIES;',' esa es la fuerza a memorizar.'),
('C079-0106',' 8 CM sobre superficie limpia;',' ≈ 8 cm por encima de los vértices más altos si hay escombro.'),
('C079-0126','car el primer hueso del tórax;',' la del lado de la cara abierta sin tapar BOCA ni NARIZ, antebrazo contra la frente; con mano debajo (cuatro variantes): dedos bajo la MUÑECA de la víctima.'),
('C079-0143','rantes la colocan desde fuera;',' (3) terreno sucio y solo 4: la coloca el de PIERNAS, que sujeta momentáneamente las piernas con un brazo cruzado y tira de la tabla con el otro; desvíos de pocos centímetros se corrigen bajando orientado.'),
('C079-0186',' giro a derechas o izquierdas;',' los DOS CENTRALES no caminan (giran sobre su punto) y el resto camina.'),
('C079-0187',' levantar tabla, TENSIÓN, YA»;',' los dos sobrantes se colocan en el extremo hacia donde se avanza, estables y al alcance de la primera asa; «PASA TABLA»: todos cambian las manos y la tabla avanza, quedando libres los traseros, que caminan con manos libres y visión completa hasta colocarse delante.'),
('C079-0191','loca el collarín traccionando;',' después manos en V por ambos lados de la nuca hasta tocarse al inicio de la espalda y cierra los ANTEBRAZOS sujetando la cabeza (nunca por debajo); nota la elevación y acompaña; DA LAS ÓRDENES; si lo hay, el SANITARIO.'),
('C079-0192','elo, dejando sitio a los pies;',' un brazo bajo ambos MUSLOS y otro bajo ambos GEMELOS, abrazándolas contra el pecho (lesiones ocultas: el dolor provoca movimientos que agravan lesiones medulares).'),
('C079-0193','oduce, se baja todos a la vez;',' después ATADO a la tabla y DAMA DE ELCHE.'),
('C079-0196','rescatadores, DOS A CADA LADO;',' «PREPARADOS para levantar tabla, TENSIÓN, YA»; los dos sobrantes se colocan en el extremo hacia donde se avanza, estables y al alcance de la primera asa; «PASA TABLA»: todos cambian las manos y la tabla avanza, quedando libres los traseros, que caminan con manos libres y visión completa hasta colocarse delante.'),
('C079-0223','inco apartados, en este orden:','
1. IMPRESIÓN GENERAL DEL PACIENTE.
2. EVALUACIÓN INICIAL DEL NIVEL DE CONSCIENCIA, CON ESTABILIZACIÓN DE LA COLUMNA.
3. VALORACIÓN DE LA VÍA AÉREA.
4. VALORACIÓN DE LA RESPIRACIÓN.
5. VALORACIÓN DE LA CIRCULACIÓN.'),
('C079-0235','rantes la colocan desde fuera;',' (3) terreno sucio y solo 4: la coloca el de PIERNAS, que sujeta momentáneamente las piernas con un brazo cruzado y tira de la tabla con el otro; desvíos de pocos centímetros se corrigen bajando orientado.'),
('C080-0007','UATRO PROPIEDADES PRINCIPALES:','
1. FRECUENCIA (f): la velocidad a la que se produce la oscilación, medida normalmente en ciclos por segundo, llamados HERCIOS (Hz).
2. LONGITUD DE ONDA (λ): la mínima distancia física entre dos puntos de la onda en el mismo estado dentro de la oscilación. Se mide en METROS.
3. VELOCIDAD (v): la rapidez con la que la onda se traslada. Se mide en METROS POR SEGUNDO.
4. AMPLITUD (A): la intensidad de la oscilación,…'),
('C080-0063','caciones para emergencias son:','
1. TETRA
2. TETRAPOL
3. DIGITAL MOBILE RADIO (DMR)
4. RADIO ANALÓGICA'),
('C081-0027','E de un edificio, EXCEPTUANDO:',' los del INTERIOR DE LAS VIVIENDAS y los de todo recinto o conjunto de ellos comunicados entre sí en los que la DENSIDAD DE OCUPACIÓN NO EXCEDA DE 1 PERSONA/5 M2 Y cuya SUPERFICIE TOTAL NO EXCEDA DE 50 M2 (habitaciones de hotel, residencia u hospital, despachos de oficinas).'),
('C081-0062',' planta considerada O EN OTRA:','
1) El ARRANQUE de una escalera COMPARTIMENTADA COMO LOS SECTORES DE INCENDIO, o una PUERTA de acceso a una ESCALERA PROTEGIDA, a un PASILLO PROTEGIDO o al VESTÍBULO DE INDEPENDENCIA de una ESCALERA ESPECIALMENTE PROTEGIDA. Desde zona de HOSPITALIZACIÓN o TRATAMIENTO INTENSIVO, superficie mínima de 0,70 M2 o 1,50 M2 POR OCUPANTE respectivamente (en escaleras, referida al RELLANO de la planta, admitiéndose…'),
('C081-0067',' planta, con TRES condiciones:',' el sector inicial tiene OTRA salida de planta que no conduzca al mismo sector alternativo; el sector alternativo tiene superficie de circulación para albergar a los ocupantes del inicial A RAZÓN DE 0,5 M2/PERSONA contando solo puntos a MENOS DE 30 M de recorrido desde el acceso (en Hospitalario, según el punto 1); y la evacuación del sector alternativo NO CONFLUYE con la del inicial en ningún otro sector, excepto…'),
('C081-0077',' LA EVACUACIÓN, porque cumple:',' permite la DISPERSIÓN de los ocupantes en condiciones de seguridad — se cumple con SUPERFICIE ≥ 0,5P M2 delante de cada salida DENTRO DE LA ZONA DELIMITADA CON RADIO 0,1P M desde la salida, siendo P los ocupantes previstos; si P NO EXCEDE DE 50, no hace falta comprobarlo —; si el espacio NO está comunicado con la RED VIARIA u otros espacios abiertos, no puede considerarse ninguna zona a MENOS DE 15 M de cualquier…'),
('C081-0135','GENCIA. SIETE características:','
- ACCESO en cada planta desde el recinto de una ESCALERA PROTEGIDA o desde el VESTÍBULO DE INDEPENDENCIA de una escalera especialmente protegida, a través de PUERTA E30; si el acceso es desde el recinto de una escalera ESPECIALMENTE PROTEGIDA, la puerta E30 no es necesaria.
- CAPACIDAD DE CARGA mínima 630 KG, CABINA de 1,10 M x 1,40 M, ANCHURA DE PASO 1,00 M y VELOCIDAD tal que realice TODO SU RECORRIDO EN MENOS DE…'),
('C081-0186','rio y desde otro punto seguro;',' VESTÍBULOS DE INDEPENDENCIA en toda comunicación con la sala; encima de la escena, SOLO LOCALES TÉCNICOS de uso directo de la escena; recorrido de evacuación desde cualquier punto del escenario ≤ 25 M con puertas abriendo en el sentido de la evacuación; pasarelas y galerías con salidas de evacuación; pasarelas y escaleras del escenario de ANCHURA ≥ 0,80 M; parte superior con SISTEMA DE ELIMINACIÓN DE HUMO.'),
('C081-0187','S de uso directo de la escena;',' recorrido de evacuación desde cualquier punto del escenario ≤ 25 M con puertas abriendo en el sentido de la evacuación; pasarelas y galerías con salidas de evacuación; pasarelas y escaleras del escenario de ANCHURA ≥ 0,80 M; parte superior con SISTEMA DE ELIMINACIÓN DE HUMO.'),
('C081-0188','n el sentido de la evacuación;',' pasarelas y galerías con salidas de evacuación; pasarelas y escaleras del escenario de ANCHURA ≥ 0,80 M; parte superior con SISTEMA DE ELIMINACIÓN DE HUMO.'),
('C081-0189','escenario de ANCHURA ≥ 0,80 M;',' parte superior con SISTEMA DE ELIMINACIÓN DE HUMO.'),
('C081-0195',' o a efectos de MANTENIMIENTO:',' salas de máquinas, cuartos de instalaciones, locales de material de limpieza, determinados almacenes y archivos, trasteros de viviendas.'),
('C081-0200','adir la anchura libre de paso:',' RELLANOS de escaleras protegidas o especialmente protegidas, VESTÍBULOS DE INDEPENDENCIA de escaleras especialmente protegidas, o un PASILLO PROTEGIDO.'),
('C081-0204','cada 100 ocupantes o fracción;',' 1 de movilidad reducida por cada 33, excepto en Residencial Vivienda.]'),
('C081-0206','B-SUA 1-4, CUATRO condiciones:','
1) RECINTO EXCLUSIVO DE CIRCULACIÓN, compartimentado con elementos EI 120; sus fachadas cumplen SI 2.1. En planta de salida, las protegidas o especialmente protegidas para evacuación ASCENDENTE pueden carecer de compartimentación; las DESCENDENTES, cuando la planta sea SECTOR DE RIESGO MÍNIMO.
2) MÁXIMO DOS ACCESOS EN CADA PLANTA, por puertas EI2 60-C5 y desde ESPACIOS DE CIRCULACIÓN COMUNES Y SIN OCUPACIÓN PROPIA.…'),
('C081-0215','IE ÚTIL ≥ 1 M2 EN CADA PLANTA;',' b) DOS CONDUCTOS INDEPENDIENTES de entrada y salida de aire, exclusivos, con sección útil total de 50 CM2 POR CADA M3 DE RECINTO EN CADA PLANTA (entrada y salida), relación de lados ≤ 4 en conductos rectangulares, rejillas de igual sección; EN CADA PLANTA, parte superior de las rejillas de ENTRADA a ALTURA MENOR QUE 1 M y las de SALIDA ENFRENTADAS y con parte inferior a ALTURA MAYOR QUE 1,80 M; c) SISTEMA DE…'),
('C081-0218','ior a ALTURA MAYOR QUE 1,80 M;',' c) SISTEMA DE PRESIÓN DIFERENCIAL conforme a EN 12101-6:2005.'),
('C081-0220','HUMO por UNA de tres opciones:',' a) VENTILACIÓN NATURAL con ventanas o huecos al exterior de SUPERFICIE ÚTIL ≥ 1 M2 EN CADA PLANTA; b) DOS CONDUCTOS INDEPENDIENTES de entrada y salida de aire, exclusivos, con sección útil total de 50 CM2 POR CADA M3 DE RECINTO EN CADA PLANTA (entrada y salida), relación de lados ≤ 4 en conductos rectangulares, rejillas de igual sección; EN CADA PLANTA, parte superior de las rejillas de ENTRADA a ALTURA MENOR QUE 1…'),
('C081-0226','GARANTÍA DE COMPARTIMENTACIÓN;',' SOLO puede comunicar con los recintos o zonas a independizar, con ASEOS DE PLANTA y con ASCENSORES.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 10: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
