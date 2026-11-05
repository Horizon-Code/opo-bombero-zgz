-- Lote 2: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C016-0226','stablecerá REGLAMENTARIAMENTE:','
a) AUTORIZACIÓN de gasto.
b) DISPOSICIÓN O COMPROMISO de gasto.
c) RECONOCIMIENTO O LIQUIDACIÓN DE LA OBLIGACIÓN.
d) ORDENACIÓN DE PAGO.'),
('C017-0049','ARTÍCULO 3. PRINCIPIOS:','
1. PUBLICIDAD DE LA INFORMACIÓN: se PRESUME EL CARÁCTER PÚBLICO de la información obrante en la Administración municipal, pudiendo denegarse el acceso ÚNICAMENTE en los supuestos expresamente previstos por las leyes y por esta Ordenanza, y mediante RESOLUCIÓN MOTIVADA, impugnable en vía administrativa y judicial.'),
('C017-0098','cause un PERJUICIO CONCRETO a:','
a) La SEGURIDAD NACIONAL.
b) La DEFENSA.
c) Las RELACIONES EXTERIORES.
d) La SEGURIDAD PÚBLICA.
e) La PREVENCIÓN, INVESTIGACIÓN Y SANCIÓN de los ilícitos penales, administrativos o disciplinarios.
f) La IGUALDAD DE LAS PARTES en los procesos judiciales y la TUTELA JUDICIAL EFECTIVA.
g) Las FUNCIONES ADMINISTRATIVAS DE VIGILANCIA, INSPECCIÓN Y CONTROL.
h) Los INTERESES ECONÓMICOS Y COMERCIALES.
i) La POLÍTICA…'),
('C017-0237','condiciones y tasas o precios;',' f) PROPONER LA CUANTÍA de las tasas y precios aplicables a la reutilización para su incorporación a las ORDENANZAS FISCALES; g) mantener un CANAL DE COMUNICACIÓN con la ciudadanía; h) establecer los ESTÁNDARES de esquemas y vocabularios; i) SUPERVISAR el cumplimiento; j) INSTRUIR los procedimientos sancionadores y proponer las sanciones.'),
('C017-0239','por los servicios municipales;',' finalidad, aprovechar los RENDIMIENTOS SOCIALES Y ECONÓMICOS de su utilización por otras entidades.'),
('C017-0243',' previo juicio de ponderación;',' y de cualesquiera otros empleados, indicando ÚNICAMENTE EL MOTIVO.'),
('C017-0245','ESARROLLO de los instrumentos;',' actos de RECLASIFICACIÓN Y RECALIFICACIÓN y enajenaciones del patrimonio municipal; LICENCIAS DE OBRAS MAYORES Y DE ACTIVIDAD, otorgadas y DENEGADAS, y las sanciones y medidas de restablecimiento de la legalidad; y los SOLARES incluidos en el Registro de solares.'),
('C017-0247',' sus evaluaciones ambientales;',' informes de avance; DATOS DE CALIDAD del aire y del agua, NIVELES POLÍNICOS y CONTAMINACIÓN ACÚSTICA; datos de seguimiento de actividades; TÍTULOS HABILITANTES con efecto significativo; y estudios de impacto y evaluaciones de riesgo.'),
('C017-0248','de seguimiento de actividades;',' TÍTULOS HABILITANTES con efecto significativo; y estudios de impacto y evaluaciones de riesgo.'),
('C017-0249','udad y el programa de FIESTAS;',' la CARTOGRAFÍA, incluidas vías públicas, antenas de telefonía móvil y CLAVOS TOPOGRÁFICOS; edificios históricos y rutas turísticas; CEMENTERIOS; ESTADÍSTICAS por BARRIOS Y DISTRITOS; colectivos y asociaciones registrados; indicadores de calidad de vida y de la Agenda 21; equipamientos como ASEOS PÚBLICOS o PUNTOS WIFI; farmacias, centros de salud, ESTACIONES DE SERVICIO, paradas de taxi, PUNTOS LIMPIOS,…'),
('C017-0253','TICAS por BARRIOS Y DISTRITOS;',' colectivos y asociaciones registrados; indicadores de calidad de vida y de la Agenda 21; equipamientos como ASEOS PÚBLICOS o PUNTOS WIFI; farmacias, centros de salud, ESTACIONES DE SERVICIO, paradas de taxi, PUNTOS LIMPIOS, restaurantes o alojamientos; TRANSPORTE URBANO con precios, frecuencias e incidencias y, de ser posible, EN TIEMPO REAL; y los organismos y centros municipales.'),
('C019-0016','ersonal LABORAL al servicio de',':
a) La Administración General del Estado.'),
('C019-0078','dos públicos se clasifican en:','
a) Funcionarios de CARRERA.
b) Funcionarios INTERINOS.
c) Personal LABORAL, ya sea FIJO, POR TIEMPO INDEFINIDO o TEMPORAL.
d) Personal EVENTUAL.'),
('C019-0097','más de por las causas del art.',' 63, por:
a) Cobertura reglada del puesto por funcionario de carrera.'),
('C019-0105','conforme a los plazos del art.',' 70, hasta la resolución de la convocatoria, SIN que su cese dé lugar a compensación económica.'),
('C019-0139','- los SISTEMAS DE PROVISIÓN,','
- las RETRIBUCIONES COMPLEMENTARIAS.'),
('C019-0140','U CASO, a que estén adscritos,','
- los SISTEMAS DE PROVISIÓN,
- las RETRIBUCIONES COMPLEMENTARIAS.'),
('C019-0141','a DENOMINACIÓN de los puestos,','
- los GRUPOS DE CLASIFICACIÓN PROFESIONAL,
- los CUERPOS O ESCALAS, EN SU CASO, a que estén adscritos,
- los SISTEMAS DE PROVISIÓN,
- las RETRIBUCIONES COMPLEMENTARIAS.'),
('C019-0142',' DE CLASIFICACIÓN PROFESIONAL,','
- los CUERPOS O ESCALAS, EN SU CASO, a que estén adscritos,
- los SISTEMAS DE PROVISIÓN,
- las RETRIBUCIONES COMPLEMENTARIAS.'),
('C019-0148','mos, en los siguientes grupos:','
GRUPO A: dividido en dos SUBGRUPOS, A1 y A2.'),
('C019-0159',' locales estará integrado por:','
- FUNCIONARIOS DE CARRERA,
- CONTRATADOS EN RÉGIMEN DE DERECHO LABORAL,
- y PERSONAL EVENTUAL que desempeña puestos de CONFIANZA O ASESORAMIENTO ESPECIAL.'),
('C019-0160','- FUNCIONARIOS DE CARRERA,','
- CONTRATADOS EN RÉGIMEN DE DERECHO LABORAL,
- y PERSONAL EVENTUAL que desempeña puestos de CONFIANZA O ASESORAMIENTO ESPECIAL.'),
('C019-0161','EN RÉGIMEN DE DERECHO LABORAL,','
- y PERSONAL EVENTUAL que desempeña puestos de CONFIANZA O ASESORAMIENTO ESPECIAL.'),
('C019-0185','servadas a estos funcionarios:','
a) La de SECRETARÍA, comprensiva de la FE PÚBLICA y el ASESORAMIENTO LEGAL PRECEPTIVO.
b) El CONTROL Y LA FISCALIZACIÓN INTERNA de la gestión económico-financiera y presupuestaria, y la CONTABILIDAD, TESORERÍA Y RECAUDACIÓN.
En los municipios de GRAN POBLACIÓN se estará al Título X; en Madrid y Barcelona, a sus leyes de capitalidad y régimen especial.
2. TRES SUBESCALAS: a) SECRETARÍA; b) INTERVEN'),
('C019-0187','b) INTERVENCIÓN-TESORERÍA;',' c) SECRETARÍA-INTERVENCIÓN (que asume ambas funciones).'),
('C019-0192','ón del Estado, MÍNIMO EL 80 %;',' los AUTONÓMICOS, HASTA EL 15 %; los de la CORPORACIÓN local, HASTA EL 5 %.'),
('C019-0193','os AUTONÓMICOS, HASTA EL 15 %;',' los de la CORPORACIÓN local, HASTA EL 5 %.'),
('C019-0196','istirán DOS CONCURSOS ANUALES:',' el ORDINARIO y el UNITARIO, que tendrá NATURALEZA SUPLETORIA y será convocado por la Administración del Estado.'),
('C019-0200','echos pudieran ser FALTA LEVE;',' la COMUNIDAD AUTÓNOMA con carácter general; el MINISTERIO si pudieran ser FALTAS MUY GRAVES tipificadas en normativa básica estatal.'),
('C019-0201','AUTÓNOMA con carácter general;',' el MINISTERIO si pudieran ser FALTAS MUY GRAVES tipificadas en normativa básica estatal.'),
('C019-0204','INISTRO si es falta muy grave;',' la COMUNIDAD AUTÓNOMA para suspensión y destitución no comprendidas en lo anterior; el ÓRGANO LOCAL para faltas leves.'),
('C019-0205','o comprendidas en lo anterior;',' el ÓRGANO LOCAL para faltas leves.'),
('C019-0223','ento de selección y formación;',' b) los TÍTULOS ACADÉMICOS requeridos para tomar parte en las pruebas selectivas, así como los DIPLOMAS complementarios que puedan exigirse.'),
('C019-0225','establecer REGLAMENTARIAMENTE:',' a) las REGLAS BÁSICAS y los PROGRAMAS MÍNIMOS a que debe ajustarse el procedimiento de selección y formación; b) los TÍTULOS ACADÉMICOS requeridos para tomar parte en las pruebas selectivas, así como los DIPLOMAS complementarios que puedan exigirse.'),
('C019-0241',') De 2.000 a 5.000 habitantes:',' excepcionalmente UNO, cuando no haya miembros de la corporación con dedicación exclusiva.'),
('C019-0259','ÓN SUCESIVA DE LOS CANDIDATOS;',' la PLANTILLA; y la RELACIÓN DE PUESTOS DE TRABAJO con niveles, jornada, forma de provisión y retribuciones.'),
('C019-0260',': la OFERTA DE EMPLEO PÚBLICO;',' los PROCESOS SELECTIVOS, con las listas y la POSICIÓN SUCESIVA DE LOS CANDIDATOS; la PLANTILLA; y la RELACIÓN DE PUESTOS DE TRABAJO con niveles, jornada, forma de provisión y retribuciones.'),
('C019-0274','lguna de estas circunstancias:','
a) Existencia de PLAZAS VACANTES, cuando no sea posible su cobertura por funcionarios de carrera, POR UN MÁXIMO DE TRES AÑOS.
b) SUSTITUCIÓN TRANSITORIA de los titulares, durante el tiempo estrictamente necesario.
c) Ejecución de PROGRAMAS DE CARÁCTER TEMPORAL, que no podrán durar más de TRES AÑOS, AMPLIABLES HASTA DOCE MESES MÁS por las leyes de Función Pública.
d) EXCESO O ACUMULACIÓN DE TAREAS por plazo máximo…'),
('C019-0299','- FUNCIONARIOS DE CARRERA,','
- CONTRATADOS EN RÉGIMEN DE DERECHO LABORAL,
- y PERSONAL EVENTUAL que desempeña puestos de CONFIANZA O ASESORAMIENTO ESPECIAL.'),
('C019-0305','la OFERTA DE EMPLEO PÚBLICO;',' los PROCESOS SELECTIVOS, con las listas y la POSICIÓN SUCESIVA DE LOS CANDIDATOS; la PLANTILLA; y la RELACIÓN DE PUESTOS DE TRABAJO con niveles, jornada, forma de provisión y retribuciones.'),
('C020-0028','se ejercen de forma COLECTIVA:','
a) LIBERTAD SINDICAL.
b) NEGOCIACIÓN COLECTIVA y participación en la determinación de las condiciones de trabajo.
c) Ejercicio de la HUELGA, con la garantía del MANTENIMIENTO DE LOS SERVICIOS ESENCIALES de la comunidad.
d) PLANTEAMIENTO DE CONFLICTOS COLECTIVOS de trabajo.
e) REUNIÓN, en los términos del artículo 46 de este Estatuto.'),
('C020-0037','ación AISLADA O SIMULTÁNEA de:','
a) CARRERA HORIZONTAL: progresión de grado, categoría, escalón u otros conceptos análogos, SIN NECESIDAD DE CAMBIAR DE PUESTO.
b) CARRERA VERTICAL: ascenso en la estructura de puestos por los procedimientos de provisión del capítulo III del título V.
c) PROMOCIÓN INTERNA VERTICAL: ascenso desde un cuerpo o escala de un subgrupo o grupo a OTRO SUPERIOR.
d) PROMOCIÓN INTERNA HORIZONTAL: acceso a cuerpos o escalas DEL…'),
('C020-0078','as ÚNICA Y EXCLUSIVAMENTE por:','
a) El SUELDO asignado a cada subgrupo o grupo.
b) Los TRIENIOS: cantidad IGUAL PARA CADA SUBGRUPO O GRUPO por cada TRES AÑOS DE SERVICIO.'),
('C020-0083','atendiendo, ENTRE OTROS, a:','
a) La PROGRESIÓN alcanzada dentro del sistema de carrera administrativa.
b) La ESPECIAL DIFICULTAD TÉCNICA, RESPONSABILIDAD, DEDICACIÓN, INCOMPATIBILIDAD exigible para el desempeño de determinados puestos o las CONDICIONES en que se desarrolla el trabajo.
c) El GRADO DE INTERÉS, INICIATIVA O ESFUERZO con que desempeña su trabajo y el RENDIMIENTO O RESULTADOS obtenidos.
d) Los SERVICIOS EXTRAORDINA'),
('C020-0120','TATIVAS DE COMUNIDAD AUTÓNOMA;',' y los sindicatos que hayan obtenido el 10 POR 100 O MÁS de los representantes en las elecciones en las unidades electorales del ámbito específico.'),
('C020-0143','ROL de la relación jerárquica;',' e) la determinación concreta de los SISTEMAS, CRITERIOS, ÓRGANOS Y PROCEDIMIENTOS DE ACCESO al empleo público y la promoción profesional.'),
('C020-0151','obligatoriedad de negociación:',' a) las decisiones que afecten a las POTESTADES DE ORGANIZACIÓN (si repercuten en condiciones de trabajo, sí se negocian esas condiciones); b) la regulación del ejercicio de los DERECHOS DE LOS CIUDADANOS y el procedimiento de formación de los actos; c) las condiciones de trabajo del PERSONAL DIRECTIVO; d) los PODERES DE DIRECCIÓN Y CONTROL de la relación jerárquica; e) la determinación concreta de los SISTEMAS,…'),
('C020-0162','l incremento de retribuciones;',' b) determinación y aplicación de las COMPLEMENTARIAS; c) criterios generales de ACCESO, CARRERA, PROVISIÓN, clasificación de puestos y planificación de RRHH; d) criterios de EVALUACIÓN DEL DESEMPEÑO; e) PREVISIÓN SOCIAL COMPLEMENTARIA; f) planes y fondos de FORMACIÓN y promoción interna; g) prestaciones sociales y pensiones de clases pasivas; h) derechos sindicales y de participación; i) ACCIÓN SOCIAL; j) las que…'),
('C020-0187','1 a 250, 20; de 251 a 500, 30;',' de 501 a 750, 35; de 751 en adelante, 40.'),
('C020-0188','o: hasta 100 funcionarios, 15;',' de 101 a 250, 20; de 251 a 500, 30; de 501 a 750, 35; de 751 en adelante, 40.'),
('C020-0191','1 a 250, 20; de 251 a 500, 30;',' de 501 a 750, 35; de 751 en adelante, 40.'),
('C020-0199','es en el CONJUNTO de las AAPP;',' d) los que hayan obtenido al menos el 10 POR 100 EN LA UNIDAD ELECTORAL en que se promueven; e) LOS PROPIOS FUNCIONARIOS de la unidad electoral, POR ACUERDO MAYORITARIO.'),
('C020-0200','ELECTORAL en que se promueven;',' e) LOS PROPIOS FUNCIONARIOS de la unidad electoral, POR ACUERDO MAYORITARIO.'),
('C020-0202','tativos de comunidad autónoma;',' c) los que hayan conseguido al menos el 10 POR 100 de los representantes en el CONJUNTO de las AAPP; d) los que hayan obtenido al menos el 10 POR 100 EN LA UNIDAD ELECTORAL en que se promueven; e) LOS PROPIOS FUNCIONARIOS de la unidad electoral, POR ACUERDO MAYORITARIO.'),
('C020-0203','RREO O POR MEDIOS TELEMÁTICOS;',' son electores y elegibles los funcionarios EN SERVICIO ACTIVO, excluidos quienes ocupen puestos de nombramiento por real decreto o decreto de consejo de gobierno; los GRUPOS DE ELECTORES pueden presentar candidatura si son al menos EL TRIPLE de los miembros a elegir; JUNTAS por LISTAS CERRADAS y sistema PROPORCIONAL CORREGIDO, DELEGADOS por LISTAS ABIERTAS y sistema MAYORITARIO; impugnaciones por PROCEDIMIENTO…'),
('C020-0204','ecreto de consejo de gobierno;',' los GRUPOS DE ELECTORES pueden presentar candidatura si son al menos EL TRIPLE de los miembros a elegir; JUNTAS por LISTAS CERRADAS y sistema PROPORCIONAL CORREGIDO, DELEGADOS por LISTAS ABIERTAS y sistema MAYORITARIO; impugnaciones por PROCEDIMIENTO ARBITRAL, salvo las denegaciones de inscripción de actas, que van directamente a la JURISDICCIÓN SOCIAL.'),
('C020-0205','IPLE de los miembros a elegir;',' JUNTAS por LISTAS CERRADAS y sistema PROPORCIONAL CORREGIDO, DELEGADOS por LISTAS ABIERTAS y sistema MAYORITARIO; impugnaciones por PROCEDIMIENTO ARBITRAL, salvo las denegaciones de inscripción de actas, que van directamente a la JURISDICCIÓN SOCIAL.'),
('C020-0206','BIERTAS y sistema MAYORITARIO;',' impugnaciones por PROCEDIMIENTO ARBITRAL, salvo las denegaciones de inscripción de actas, que van directamente a la JURISDICCIÓN SOCIAL.'),
('C020-0207','BIERTAS y sistema MAYORITARIO;',' impugnaciones por PROCEDIMIENTO ARBITRAL, salvo las denegaciones de inscripción de actas, que van directamente a la JURISDICCIÓN SOCIAL.'),
('C020-0267','ndrán los siguientes permisos:','
a) Por ACCIDENTE O ENFERMEDAD GRAVES, HOSPITALIZACIÓN o INTERVENCIÓN QUIRÚRGICA SIN HOSPITALIZACIÓN QUE PRECISE REPOSO DOMICILIARIO:
- del CÓNYUGE, PAREJA DE HECHO o PARIENTES HASTA EL PRIMER GRADO por consanguinidad o afinidad, así como de CUALQUIER OTRA PERSONA QUE CONVIVA en el mismo domicilio y requiera cuidado efectivo: CINCO DÍAS HÁBILES.
- de familiar dentro del SEGUNDO GRADO: CUATRO DÍAS H'),
('C020-0271','iguientes condiciones MÍNIMAS:','
a) PERMISO POR NACIMIENTO PARA LA MADRE BIOLÓGICA: DIECINUEVE SEMANAS. En MONOPARENTALIDAD, TREINTA Y DOS SEMANAS. En parto prematuro u hospitalización del neonato, se amplía tantos días como dure la hospitalización, CON UN MÁXIMO DE TRECE SEMANAS ADICIONALES. Se amplía en DOS SEMANAS MÁS para ambos progenitores por discapacidad del hijo y por cada hijo a partir del segundo en parto múltiple, una para cada…'),
('C020-0277','GATORIAS y a jornada completa;',' 2.º ONCE SEMANAS (veintidós en monoparentalidad) distribuibles a voluntad hasta que el hijo cumpla DOCE MESES; 3.º DOS SEMANAS (cuatro en monoparentalidad) distribuibles hasta que el hijo cumpla OCHO AÑOS.'),
('C020-0278','GATORIAS y a jornada completa;',' 2.º ONCE SEMANAS (veintidós en monoparentalidad) distribuibles a voluntad hasta que el hijo cumpla DOCE MESES; 3.º DOS SEMANAS (cuatro en monoparentalidad) distribuibles hasta que el hijo cumpla OCHO AÑOS.'),
('C020-0279','que el hijo cumpla DOCE MESES;',' 3.º DOS SEMANAS (cuatro en monoparentalidad) distribuibles hasta que el hijo cumpla OCHO AÑOS.'),
('C020-0280','que el hijo cumpla DOCE MESES;',' 3.º DOS SEMANAS (cuatro en monoparentalidad) distribuibles hasta que el hijo cumpla OCHO AÑOS.'),
('C020-0302','istencia, totales o parciales,',' se consideran JUSTIFICADAS por el tiempo y condiciones que determinen los servicios sociales de atención o de salud.'),
('C020-0318','sfrute dentro del año natural,',' o sobrevengan una vez iniciado, el periodo vacacional PODRÁ DISFRUTARSE AUNQUE HAYA TERMINADO EL AÑO NATURAL, siempre que NO HAYAN TRANSCURRIDO MÁS DE DIECIOCHO MESES desde el final del año en que se originaron.'),
('C020-0324','s devengadas y no disfrutadas;',' en particular en JUBILACIÓN POR INCAPACIDAD PERMANENTE o FALLECIMIENTO, HASTA UN MÁXIMO DE DIECIOCHO MESES.'),
('C020-0336','ROL de la relación jerárquica;',' e) la determinación concreta de los SISTEMAS, CRITERIOS, ÓRGANOS Y PROCEDIMIENTOS DE ACCESO al empleo público y la promoción profesional.'),
('C020-0337','PUESTAS POR FALTAS MUY GRAVES;',' d) TENER CONOCIMIENTO Y SER OÍDOS en el establecimiento de la jornada y horario y en el régimen de vacaciones y permisos; e) VIGILAR el cumplimiento de las normas de condiciones de trabajo, PREVENCIÓN DE RIESGOS LABORALES, Seguridad Social y empleo, y ejercer acciones legales; f) COLABORAR con la Administración para el mantenimiento e incremento de la PRODUCTIVIDAD.'),
('C020-0345','que el hijo cumpla DOCE MESES;',' 3.º DOS SEMANAS (cuatro en monoparentalidad) distribuibles hasta que el hijo cumpla OCHO AÑOS.'),
('C020-0348','AS con retribuciones íntegras;',' y reducción de jornada de hasta DOS HORAS con disminución proporcional de retribuciones.'),
('C021-0115','ión ordinaria, incrementada en',':
- UN 30 POR 100 para los funcionarios del GRUPO A o nivel equivalente.'),
('C021-0133','s siguientes CARGOS ELECTIVOS:','
a) MIEMBROS DE LAS ASAMBLEAS LEGISLATIVAS DE LAS CCAA, SALVO que perciban retribuciones periódicas por el desempeño de la función o que se establezca la incompatibilidad.
b) MIEMBROS DE LAS CORPORACIONES LOCALES, SALVO que desempeñen en ellas CARGOS RETRIBUIDOS EN RÉGIMEN DE DEDICACIÓN EXCLUSIVA.
2. Solo podrá percibirse la retribución de UNA de las dos actividades, sin perjuicio de DIETAS, INDEMNIZACIONES O…'),
('C021-0135','lidad de ACTIVIDADES PÚBLICAS:',' que la cantidad total percibida por ambos puestos NO SUPERE la remuneración prevista en los Presupuestos Generales del Estado para el cargo de DIRECTOR GENERAL, NI supere la correspondiente al PRINCIPAL, estimada en régimen de dedicación ordinaria, incrementada en:
- UN 30 POR 100 para los funcionarios del GRUPO A o nivel equivalente.'),
('C021-0184','régimen de incompatibilidades:','
a) Las derivadas de la ADMINISTRACIÓN DEL PATRIMONIO PERSONAL O FAMILIAR, sin perjuicio del art. 12.
b) DIRECCIÓN DE SEMINARIOS o dictado de CURSOS O CONFERENCIAS en centros oficiales destinados a la formación de funcionarios o profesorado, cuando NO TENGAN CARÁCTER PERMANENTE NI HABITUAL NI SUPONGAN MÁS DE SETENTA Y CINCO HORAS AL AÑO, así como la PREPARACIÓN PARA EL ACCESO A LA FUNCIÓN PÚBLICA en los casos y…'),
('C021-0196',' CONSTITUCIÓN, A EXCEPCIÓN de:',' el ARTÍCULO 17.1, la DISPOSICIÓN ADICIONAL QUINTA y la DISPOSICIÓN TRANSITORIA SÉPTIMA.'),
('C021-0203','ROS, los siguientes CRITERIOS:',' el RESULTADO DAÑOSO PRODUCIDO, el GRADO DE CULPABILIDAD, la RESPONSABILIDAD PROFESIONAL del personal y su RELACIÓN CON LA PRODUCCIÓN DEL RESULTADO DAÑOSO.'),
('C021-0219','al que se instruyan, SALVO QUE',' LA DETERMINACIÓN DE LOS HECHOS EN EL ORDEN JURISDICCIONAL PENAL SEA NECESARIA PARA LA FIJACIÓN DE LA RESPONSABILIDAD PATRIMONIAL.'),
('C021-0221','ts. 404 a 445. DIEZ CAPÍTULOS:','
I. PREVARICACIÓN de los funcionarios públicos y otros comportamientos injustos (404-406).'),
('C021-0238','miten expresamente a los arts.',' 24 y 427 para definir al funcionario en los capítulos de tráfico de influencias y malversación.'),
('C021-0241','A en un ASUNTO ADMINISTRATIVO:',' INHABILITACIÓN ESPECIAL para empleo o cargo público y para el ejercicio del DERECHO DE SUFRAGIO PASIVO por tiempo de NUEVE A QUINCE AÑOS.'),
('C021-0247','tos de los TÍTULOS XXI a XXIV:',' PRISIÓN DE UNO A CUATRO AÑOS e INHABILITACIÓN ABSOLUTA de SEIS A DIEZ AÑOS.'),
('C021-0250','noticia o de sus responsables:',' INHABILITACIÓN ESPECIAL de SEIS MESES A DOS AÑOS.'),
('C021-0254','ILEGAL de un servicio público:',' MULTA DE OCHO A DOCE MESES y SUSPENSIÓN de SEIS MESES A DOS AÑOS.'),
('C021-0342','TODO CASO, no podrá ejercerse:','
a) Actividades privadas EN LOS ASUNTOS EN QUE ESTÉ INTERVINIENDO, HAYA INTERVENIDO EN LOS DOS ÚLTIMOS AÑOS O TENGA QUE INTERVENIR por razón del puesto público. Se incluyen las actividades profesionales prestadas a PERSONAS A QUIENES SE ESTÉ OBLIGADO A ATENDER en el desempeño del puesto público.
b) PERTENENCIA A CONSEJOS DE ADMINISTRACIÓN u órganos rectores de empresas o entidades PRIVADAS cuya actividad esté…'),
('C021-0343','2015 (reutilizado del Tema 3):','
1. Para exigir responsabilidad patrimonial por los daños causados por las autoridades y personal a su servicio, LOS PARTICULARES EXIGIRÁN DIRECTAMENTE A LA ADMINISTRACIÓN las indemnizaciones que corresponda.'),
('C022-0085','go por razón de sus funciones:',' PRISIÓN DE DOS A SEIS AÑOS e INHABILITACIÓN ESPECIAL para cargo o empleo público y sufragio pasivo de SEIS A DIEZ AÑOS.'),
('C022-0087','alguna de TRES circunstancias:',' a) DAÑO O ENTORPECIMIENTO GRAVES AL SERVICIO PÚBLICO; b) valor del perjuicio o del patrimonio apropiado SUPERIOR A 50.000 EUROS; c) cosas de VALOR ARTÍSTICO, HISTÓRICO, CULTURAL O CIENTÍFICO, o EFECTOS DESTINADOS A ALIVIAR ALGUNA CALAMIDAD PÚBLICA. Si excede de 250.000 EUROS, la prisión en su MITAD SUPERIOR, pudiendo llegar a la SUPERIOR EN GRADO.
3. ATENUADA: si el perjuicio es INFERIOR A 4.000 EUROS, PRISIÓN DE…'),
('C022-0088','piado SUPERIOR A 50.000 EUROS;',' c) cosas de VALOR ARTÍSTICO, HISTÓRICO, CULTURAL O CIENTÍFICO, o EFECTOS DESTINADOS A ALIVIAR ALGUNA CALAMIDAD PÚBLICA.'),
('C022-0092','TO GRAVES AL SERVICIO PÚBLICO;',' b) valor del perjuicio o del patrimonio apropiado SUPERIOR A 50.000 EUROS; c) cosas de VALOR ARTÍSTICO, HISTÓRICO, CULTURAL O CIENTÍFICO, o EFECTOS DESTINADOS A ALIVIAR ALGUNA CALAMIDAD PÚBLICA.'),
('C022-0097','nio público puesto a su cargo:',' PRISIÓN DE SEIS MESES A TRES AÑOS y SUSPENSIÓN de UNO A CUATRO AÑOS.'),
('C022-0099',' le imponen las penas del art.',' 432.'),
('C022-0101','ECIMIENTO GRAVES del servicio;',' si no resulta, INHABILITACIÓN de UNO A TRES AÑOS y MULTA de TRES A DOCE MESES.'),
('C022-0107',' COLABORACIÓN ACTIVA Y EFICAZ:',' PENA INFERIOR EN UNO O DOS GRADOS.'),
('C022-0110','A DEFRAUDAR a un ente público:',' PRISIÓN DE DOS A SEIS AÑOS e INHABILITACIÓN de SEIS A DIEZ AÑOS.'),
('C022-0113','o EN CUANTÍA MAYOR a la legal:',' MULTA DE SEIS A VEINTICUATRO MESES y SUSPENSIÓN de SEIS MESES A CUATRO AÑOS, sin perjuicio de los reintegros.'),
('C022-0117','DAD SOCIAL abusando del cargo:',' penas respectivas EN SU MITAD SUPERIOR, pudiendo llegar a la superior en grado, e INHABILITACIÓN de TRES A NUEVE AÑOS.'),
('C022-0121','os de los órganos competentes:',' PRISIÓN DE SEIS MESES A TRES AÑOS, MULTA DEL TANTO AL TRIPLO e INHABILITACIÓN de DOS A SIETE AÑOS.'),
('C022-0123','cta o por persona interpuesta:',' PRISIÓN DE SEIS MESES A DOS AÑOS, MULTA DE DOCE A VEINTICUATRO MESES e INHABILITACIÓN de DOS A SIETE AÑOS.'),
('C022-0128','su oficina o centro directivo:',' MULTA DE SEIS A DOCE MESES y SUSPENSIÓN de DOS A CINCO AÑOS.'),
('C022-0133','o sobre las que deba informar:',' PRISIÓN DE UNO A DOS AÑOS e INHABILITACIÓN ABSOLUTA de SEIS A DOCE AÑOS.'),
('C022-0180','E HAYA VULNERADO LA LEGALIDAD;',' b) la GRAVEDAD DE LOS DAÑOS causados al interés público, patrimonio o bienes; c) el DESCRÉDITO PARA LA IMAGEN PÚBLICA de la Administración.'),
('C022-0181',' público, patrimonio o bienes;',' c) el DESCRÉDITO PARA LA IMAGEN PÚBLICA de la Administración.'),
('C022-0198','ENCIA revelado en la conducta;',' el DAÑO AL INTERÉS PÚBLICO; la REITERACIÓN O REINCIDENCIA; y el GRADO DE PARTICIPACIÓN.'),
('C022-0219',' impidan desempeñar el puesto;',' EN ESTE CASO, si excede de seis meses NO SUPONDRÁ PÉRDIDA DEL PUESTO DE TRABAJO.'),
('C022-0233','NJUSTIFICADO. La AUTORIDAD que',', durante el desempeño de su cargo Y HASTA CINCO AÑOS DESPUÉS DE CESAR, hubiera obtenido un incremento patrimonial o cancelación de deudas POR VALOR SUPERIOR A 250.000 EUROS respecto a sus ingresos acreditados y SE NEGARA ABIERTAMENTE a justificarlo ante los requerimientos de los órganos competentes: PRISIÓN DE SEIS MESES A TRES AÑOS, MULTA DEL TANTO AL TRIPLO e INHABILITACIÓN de DOS A SIETE AÑOS.'),
('C022-0237','la REITERACIÓN O REINCIDENCIA;',' y el GRADO DE PARTICIPACIÓN.'),
('C022-0264','OZA, publicado en el BOPZ NÚM.',' 16, DE 20 DE ENERO DE 2024.'),
('C022-0299','omunicación y sensibilización;',' A.2 Participación y negociación; A.3 Formación; A.4 Estructura y órganos municipales para el seguimiento del PIEEM.'),
('C022-0303','abajo y promoción profesional;',' B.3 Retribuciones.'),
('C022-0311','omunicación y sensibilización;',' A.2 Participación y negociación; A.3 Formación; A.4 Estructura y órganos municipales para el seguimiento del PIEEM.'),
('C022-0312','ud laboral; D.2 Clima laboral;',' D.3 Protección frente al acoso.'),
('C022-0317','ntilla; comparativa 2008-2019;',' concejalías, personal directivo y eventual; representación sindical; procesos selectivos y promoción; retribuciones; formación; conciliación; prevención del acoso y salud laboral; e infrarrepresentación.'),
('C022-0318','ocesos selectivos y promoción;',' retribuciones; formación; conciliación; prevención del acoso y salud laboral; e infrarrepresentación.'),
('C022-0328',' asociados a roles masculinos;',' concentración de mujeres en tareas administrativas y de atención a la ciudadanía.'),
('C022-0331','jeres frente a 72,4 % hombres;',' en el COMITÉ DE EMPRESA se invierte, con 77,8 % mujeres y 22,2 % hombres.'),
('C022-0335',' y Agrupaciones Profesionales;',' las mujeres, plazas de Administrativa y subgrupos A1 y A2.'),
('C022-0355','ciones Profesionales, C2 y C1;',' y DOS TEMAS para A2 y A1, relativos a la NORMATIVA VIGENTE EN MATERIA DE IGUALDAD DE GÉNERO.'),
('C022-0358','S, SEGÚN EL GRUPO DE LA PLAZA:',' UN TEMA para Agrupaciones Profesionales, C2 y C1; y DOS TEMAS para A2 y A1, relativos a la NORMATIVA VIGENTE EN MATERIA DE IGUALDAD DE GÉNERO.'),
('C023-0019',' EL PERSONAL del Ayuntamiento;',' las empresas externas, colaboradoras, sociedades y patronatos son INFORMADAS de su existencia, y si el caso se produce entre personal municipal y de empresa externa se aplican los mecanismos de COORDINACIÓN EMPRESARIAL.'),
('C023-0039','10/07/2018, y en el «BOE» núm.',' 209, de 29/08/2018.'),
('C023-0070','eres públicos de Aragón serán:','
1. GARANTÍA DE LA EFECTIVIDAD DEL DERECHO DE IGUALDAD, que supone ausencia de toda discriminación directa o indirecta por razón de género.
2. INTEGRACIÓN de la igualdad de trato y de oportunidades en el CONJUNTO DE LAS POLÍTICAS de Aragón.
3. IMPULSO DE LA COLABORACIÓN Y COOPERACIÓN entre las Administraciones públicas aragonesas.
4. PARTICIPACIÓN Y REPRESENTACIÓN EQUILIBRADA en todos los ámbitos d'),
('C023-0119','ner estadísticas actualizadas;',' diseñar políticas contra las desigualdades; y cualquier otra que atribuya la legislación.'),
('C023-0165','arantizará en CINCO supuestos:','
1. Nombramiento de titulares de ÓRGANOS DIRECTIVOS cuya designación corresponda al Gobierno de Aragón, procurando la representación de mujeres de GRUPOS MINORITARIOS.
2. Composición de los ÓRGANOS COLEGIADOS, también en su modificación o renovación.
3. Designación de representantes del Gobierno en órganos colegiados, COMITÉS DE PERSONAS EXPERTAS o comités consultivos.
4. Nombramientos en CONSEJOS DE ADMINISTRACIÓN…'),
('C023-0269','ración entre Administraciones;',' establecimiento de directrices para la FORMACIÓN del personal, que en todo caso será impartida por PROFESIONALES EXPERTOS; asistencia técnica cualificada; EL EJERCICIO DE LA POTESTAD SANCIONATORIA; y cualquier otra función atribuida.'),
('C023-0272','; integrar la transversalidad;',' establecer las condiciones de FORMACIÓN Y CAPACITACIÓN DEL PERSONAL A SU SERVICIO; ELABORAR, APROBAR, EJECUTAR Y EVALUAR LOS PLANES DE IGUALDAD DESTINADOS AL PERSONAL A SU SERVICIO; establecer recursos de conciliación; fomentar la autonomía personal y económica de las mujeres; fomentar su presencia en los órganos de participación; apoyar a los grupos feministas; mantener estadísticas actualizadas; diseñar políticas…'),
('C023-0275','DOS AL PERSONAL A SU SERVICIO;',' establecer recursos de conciliación; fomentar la autonomía personal y económica de las mujeres; fomentar su presencia en los órganos de participación; apoyar a los grupos feministas; mantener estadísticas actualizadas; diseñar políticas contra las desigualdades; y cualquier otra que atribuya la legislación.'),
('C023-0293','rincipio de igualdad de trato;',' velará por niveles máximos de igualdad educativa con integración de las minorías étnicas y en especial de la COMUNIDAD GITANA; aplicará el uso integrador y no sexista del lenguaje en materiales curriculares; asegurará metodologías que garanticen la COEDUCACIÓN; reflejará la igualdad en el PROYECTO EDUCATIVO de todos los centros; y articulará un PLAN ESTRATÉGICO.'),
('C023-0297','os proyectos de INVESTIGACIÓN;',' reconocimiento de los estudios de género como MÉRITO investigador; y apoyo a la creación de CÁTEDRAS DE ESTUDIOS DE GÉNERO.'),
('C023-0301','o y de COMPOSICIÓN TRIPARTITA;',' y actuaciones de empleabilidad conforme al principio de interseccionalidad.'),
('C023-0305','dos y comisiones de selección;',' revisión de planes de estudio para identificar SESGOS DE GÉNERO; OBLIGATORIEDAD de formación en género para el profesorado; perspectiva de género en los proyectos de INVESTIGACIÓN; reconocimiento de los estudios de género como MÉRITO investigador; y apoyo a la creación de CÁTEDRAS DE ESTUDIOS DE GÉNERO.'),
('C023-0321','nicándolo a quien las formuló;',' igualdad en el trabajo; campañas de INSPECCIÓN en el seno de la Comisión Territorial de la Inspección de Trabajo; fomento de la contratación de mujeres y del EMPRENDIMIENTO; y calidad en el empleo y el autoempleo.'),
('C024-0011','er PROTOCOLOS frente al acoso;',' eliminar la DISCRIMINACIÓN RETRIBUTIVA por trabajo de igual valor; y EVALUAR PERIÓDICAMENTE la efectividad del principio de igualdad.'),
('C024-0024','AS RESPONSABLES de atenderlas;',' y aplicación de las SANCIONES previstas en la legislación de empleo público.'),
('C024-0047','ar la dignidad y la intimidad;',' c) el TRATAMIENTO CONFIDENCIAL de las denuncias; d) la DETERMINACIÓN DE LAS PERSONAS RESPONSABLES de atender denuncias o quejas; e) la APLICACIÓN DE LAS SANCIONES previstas en la legislación de empleo público.'),
('C024-0048','de atender denuncias o quejas;',' e) la APLICACIÓN DE LAS SANCIONES previstas en la legislación de empleo público.'),
('C024-0049','mpromiso de prevenir y actuar;',' b) la INFORMACIÓN E INSTRUCCIÓN a todo el personal de su deber de respetar la dignidad y la intimidad; c) el TRATAMIENTO CONFIDENCIAL de las denuncias; d) la DETERMINACIÓN DE LAS PERSONAS RESPONSABLES de atender denuncias o quejas; e) la APLICACIÓN DE LAS SANCIONES previstas en la legislación de empleo público.'),
('C024-0051','CONFIDENCIAL de las denuncias;',' d) la DETERMINACIÓN DE LAS PERSONAS RESPONSABLES de atender denuncias o quejas; e) la APLICACIÓN DE LAS SANCIONES previstas en la legislación de empleo público.'),
('C024-0059','DE LAS DIFERENCIAS BIOLÓGICAS;',' reservas de plazas para mujeres de colectivos de vulnerabilidad; fomento del empleo de MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e implantación de un plan de igualdad.'),
('C024-0060','BORAL, y apoyo a las víctimas;',' lenguaje integrador en la comunicación interna y en la publicidad; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL ATENDIENDO A LAS CONSECUENCIAS DERIVADAS DE LAS DIFERENCIAS BIOLÓGICAS; reservas de plazas para mujeres de colectivos de vulnerabilidad; fomento del empleo de MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e implantación de un plan de…'),
('C024-0061','del empleo de MUJERES JÓVENES;',' posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e implantación de un plan de igualdad.'),
('C024-0062','ÓN DURANTE LA JORNADA LABORAL;',' e implantación de un plan de igualdad.'),
('C024-0064','nsabilidad social corporativa;',' PREVENCIÓN DE LA SALUD LABORAL ATENDIENDO A LAS CONSECUENCIAS DERIVADAS DE LAS DIFERENCIAS BIOLÓGICAS; reservas de plazas para mujeres de colectivos de vulnerabilidad; fomento del empleo de MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e implantación de un plan de igualdad.'),
('C024-0065',' colectivos de vulnerabilidad;',' fomento del empleo de MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e implantación de un plan de igualdad.'),
('C024-0070','iones y en puestos directivos;',' garantías de IGUALDAD RETRIBUTIVA POR TRABAJOS DE IGUAL VALOR; medidas de conciliación; prevención y sanción del acoso sexual, por razón de género y LABORAL, y apoyo a las víctimas; lenguaje integrador en la comunicación interna y en la publicidad; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL ATENDIENDO A LAS CONSECUENCIAS DERIVADAS DE LAS DIFERENCIAS BIOLÓGICAS; reservas de plazas para…'),
('C024-0076','del eje de interseccionalidad;',' FOMENTO DE EMPLEO DE MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e IMPLANTACIÓN DE UN PLAN DE IGUALDAD.'),
('C024-0077','terna, publicidad y marketing;',' responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad; FOMENTO DE EMPLEO DE MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e IMPLANTACIÓN DE UN PLAN DE IGUALDAD.'),
('C024-0078',' la violencia contra la mujer;',' LENGUAJE INTEGRADOR Y NO SEXISTA en comunicación interna, publicidad y marketing; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad; FOMENTO DE EMPLEO DE MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e IMPLANTACIÓN DE UN…'),
('C024-0079',' a las diferencias biológicas;',' RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad; FOMENTO DE EMPLEO DE MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e IMPLANTACIÓN DE UN PLAN DE IGUALDAD.'),
('C024-0080','A POR TRABAJOS DE IGUAL VALOR;',' medidas de conciliación; prevención y sanción del acoso sexual, por razón de género y LABORAL, y de la violencia contra la mujer; LENGUAJE INTEGRADOR Y NO SEXISTA en comunicación interna, publicidad y marketing; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad;…'),
('C024-0081','y acceso a puestos directivos;',' IGUALDAD RETRIBUTIVA POR TRABAJOS DE IGUAL VALOR; medidas de conciliación; prevención y sanción del acoso sexual, por razón de género y LABORAL, y de la violencia contra la mujer; LENGUAJE INTEGRADOR Y NO SEXISTA en comunicación interna, publicidad y marketing; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de…'),
('C024-0082','ÓN DURANTE LA JORNADA LABORAL;',' e IMPLANTACIÓN DE UN PLAN DE IGUALDAD.'),
('C024-0085','nsabilidad social corporativa;',' PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad; FOMENTO DE EMPLEO DE MUJERES JÓVENES; posibilidad de realizar CURSOS DE FORMACIÓN DURANTE LA JORNADA LABORAL; e IMPLANTACIÓN DE UN PLAN DE IGUALDAD.'),
('C024-0086','ALOR; medidas de conciliación;',' prevención y sanción del acoso sexual, por razón de género y LABORAL, y de la violencia contra la mujer; LENGUAJE INTEGRADOR Y NO SEXISTA en comunicación interna, publicidad y marketing; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL atendiendo a las diferencias biológicas; RESERVAS DE PLAZAS para mujeres de colectivos de vulnerabilidad del eje de interseccionalidad; FOMENTO DE EMPLEO DE MUJERES…'),
('C024-0087','ibrada en grupos y categorías;',' participación equilibrada en la toma de decisiones y acceso a puestos directivos; IGUALDAD RETRIBUTIVA POR TRABAJOS DE IGUAL VALOR; medidas de conciliación; prevención y sanción del acoso sexual, por razón de género y LABORAL, y de la violencia contra la mujer; LENGUAJE INTEGRADOR Y NO SEXISTA en comunicación interna, publicidad y marketing; responsabilidad social corporativa; PREVENCIÓN DE LA SALUD LABORAL…'),
('C024-0092','s, comerciales y de servicios;',' investigación sobre tiempos y horarios; INTEGRACIÓN DE FUNCIONES y descentralización de servicios; planes de diseño y organización de espacios que reduzcan tiempos de acceso y desplazamiento; centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES, personas con discapacidad o dependencia, con HORARIOS COMPATIBLES con las jornadas laborales; y atención a todos los modelos de familia y a…'),
('C024-0093','escentralización de servicios;',' planes de diseño y organización de espacios que reduzcan tiempos de acceso y desplazamiento; centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES, personas con discapacidad o dependencia, con HORARIOS COMPATIBLES con las jornadas laborales; y atención a todos los modelos de familia y a las mujeres del MEDIO RURAL o en vulnerabilidad.'),
('C024-0094','os de acceso y desplazamiento;',' centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES, personas con discapacidad o dependencia, con HORARIOS COMPATIBLES con las jornadas laborales; y atención a todos los modelos de familia y a las mujeres del MEDIO RURAL o en vulnerabilidad.'),
('C024-0097','ten servicios de conciliación;',' foros de buenas prácticas y campañas.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 2: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
