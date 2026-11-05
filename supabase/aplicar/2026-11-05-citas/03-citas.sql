-- Lote 3: amplía la cita (texto literal que sigue en el bloque del corpus) de 160 preguntas.
-- Guardas: solo si la cita actual acaba exactamente como la que se amplió, y no está editada a mano.
with u as (
  update public.banco_preguntas b set cita = b.cita || v.ext, editada_at = now()
  from (values
('C024-0099','enación del tiempo de trabajo;',' planes de igualdad; TELETRABAJO; incentivos a empresas que presten servicios de conciliación; foros de buenas prácticas y campañas.'),
('C024-0106','NCIÓN PÚBLICA. SEIS apartados:','
1. FLEXIBILIZACIÓN HORARIA Y DE LA JORNADA, siempre que lo permita LA NATURALEZA DE LOS PUESTOS y PREVIO ACUERDO CON LAS ORGANIZACIONES SINDICALES.
2. Medidas de conciliación EN EL MARCO DE LOS PLANES DE IGUALDAD, previa negociación, que podrán incluir flexibilización de jornada y horario y FLEXIBILIZACIÓN EN EL ESPACIO.
3. TELETRABAJO cuando las características del puesto lo permitan.
4. PREFERENCIA en la…'),
('C024-0111','n sobre adaptación de tiempos;',' integración de funciones y descentralización de servicios; planes de diseño y organización de espacios que reduzcan tiempos de desplazamiento; centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES Y DEPENDIENTES con horarios compatibles; y atención a todos los modelos de familia y al MEDIO RURAL.'),
('C024-0112','escentralización de servicios;',' planes de diseño y organización de espacios que reduzcan tiempos de desplazamiento; centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES Y DEPENDIENTES con horarios compatibles; y atención a todos los modelos de familia y al MEDIO RURAL.'),
('C024-0113','can tiempos de desplazamiento;',' centros sostenidos con fondos públicos de EDUCACIÓN INFANTIL y de CUIDADO DE MAYORES Y DEPENDIENTES con horarios compatibles; y atención a todos los modelos de familia y al MEDIO RURAL.'),
('C024-0114','NTES con horarios compatibles;',' y atención a todos los modelos de familia y al MEDIO RURAL.'),
('C024-0117','JO; incentivos a las empresas;',' foros de buenas prácticas; y reconocimiento vía Marca de Excelencia.'),
('C024-0127','DOS POR SEXO CADA CUATRO AÑOS;',' y enfoque de género en la INVESTIGACIÓN BIOMÉDICA, incluidos los ENSAYOS CLÍNICOS.'),
('C024-0129','ticas que atenten contra ella;',' salud SEXUAL Y REPRODUCTIVA con acceso universal a planificación familiar e interrupción del embarazo conforme a la legislación vigente; INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS; y enfoque de género en la INVESTIGACIÓN BIOMÉDICA, incluidos los ENSAYOS CLÍNICOS.'),
('C024-0130','orme a la legislación vigente;',' INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS; y enfoque de género en la INVESTIGACIÓN BIOMÉDICA, incluidos los ENSAYOS CLÍNICOS.'),
('C024-0131','rategias y programas de salud;',' garantía de la INTEGRIDAD FÍSICA Y PSÍQUICA de mujeres y niñas impidiendo prácticas que atenten contra ella; salud SEXUAL Y REPRODUCTIVA con acceso universal a planificación familiar e interrupción del embarazo conforme a la legislación vigente; INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS; y enfoque de género en la INVESTIGACIÓN BIOMÉDICA, incluidos los ENSAYOS CLÍNICOS.'),
('C024-0132','y evaluación CADA CUATRO AÑOS;',' PERSONAS MAYORES, visibilizando la violencia en la tercera edad y las mujeres solas con PENSIONES NO CONTRIBUTIVAS en el ámbito rural; DEPENDENCIA y valoración de las MUJERES CUIDADORAS; MUJER GITANA con artículo propio; MENORES, con especial incidencia en el ACOSO ESCOLAR; PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías étnicas y REFUGIADAS; y TRÁFICO Y EXPLOTACIÓN SEXUAL, con…'),
('C024-0133','TRIBUTIVAS en el ámbito rural;',' DEPENDENCIA y valoración de las MUJERES CUIDADORAS; MUJER GITANA con artículo propio; MENORES, con especial incidencia en el ACOSO ESCOLAR; PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías étnicas y REFUGIADAS; y TRÁFICO Y EXPLOTACIÓN SEXUAL, con protocolo específico, remisión a la Ley 4/2007 y PROHIBICIÓN DE QUE LA ADMINISTRACIÓN CONTRATE ESPACIOS O INSERTE PUBLICIDAD INSTITUCIONAL…'),
('C024-0134','ión de las MUJERES CUIDADORAS;',' MUJER GITANA con artículo propio; MENORES, con especial incidencia en el ACOSO ESCOLAR; PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías étnicas y REFUGIADAS; y TRÁFICO Y EXPLOTACIÓN SEXUAL, con protocolo específico, remisión a la Ley 4/2007 y PROHIBICIÓN DE QUE LA ADMINISTRACIÓN CONTRATE ESPACIOS O INSERTE PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS DE PROSTITUCIÓN.'),
('C024-0135','ER GITANA con artículo propio;',' MENORES, con especial incidencia en el ACOSO ESCOLAR; PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías étnicas y REFUGIADAS; y TRÁFICO Y EXPLOTACIÓN SEXUAL, con protocolo específico, remisión a la Ley 4/2007 y PROHIBICIÓN DE QUE LA ADMINISTRACIÓN CONTRATE ESPACIOS O INSERTE PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS DE PROSTITUCIÓN.'),
('C024-0136','ncidencia en el ACOSO ESCOLAR;',' PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías étnicas y REFUGIADAS; y TRÁFICO Y EXPLOTACIÓN SEXUAL, con protocolo específico, remisión a la Ley 4/2007 y PROHIBICIÓN DE QUE LA ADMINISTRACIÓN CONTRATE ESPACIOS O INSERTE PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS DE PROSTITUCIÓN.'),
('C024-0137','minorías étnicas y REFUGIADAS;',' y TRÁFICO Y EXPLOTACIÓN SEXUAL, con protocolo específico, remisión a la Ley 4/2007 y PROHIBICIÓN DE QUE LA ADMINISTRACIÓN CONTRATE ESPACIOS O INSERTE PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS DE PROSTITUCIÓN.'),
('C024-0138','S SOCIALES e INCLUSIÓN SOCIAL;',' DISCAPACIDAD, con ocho medidas y evaluación CADA CUATRO AÑOS; PERSONAS MAYORES, visibilizando la violencia en la tercera edad y las mujeres solas con PENSIONES NO CONTRIBUTIVAS en el ámbito rural; DEPENDENCIA y valoración de las MUJERES CUIDADORAS; MUJER GITANA con artículo propio; MENORES, con especial incidencia en el ACOSO ESCOLAR; PROTECCIÓN DE LA MATERNIDAD; INTERCULTURALIDAD, con mujeres migrantes, minorías…'),
('C024-0141','enciones a programas sexistas;',' CULTURA, con prohibición de acoger, adquirir o subvencionar producciones que fomenten actitudes sexistas y de ceder espacios públicos a actividades que obstaculicen la participación de mujeres; COOPERACIÓN PARA EL DESARROLLO; PLANEAMIENTO URBANÍSTICO Y VIVIENDA, con enfoque de género en el diseño de las ciudades; MOVILIDAD; SOCIEDAD DE LA INFORMACIÓN, con la BRECHA DIGITAL DE GÉNERO; y DESARROLLO RURAL, con la…'),
('C024-0142','n la participación de mujeres;',' COOPERACIÓN PARA EL DESARROLLO; PLANEAMIENTO URBANÍSTICO Y VIVIENDA, con enfoque de género en el diseño de las ciudades; MOVILIDAD; SOCIEDAD DE LA INFORMACIÓN, con la BRECHA DIGITAL DE GÉNERO; y DESARROLLO RURAL, con la COTITULARIDAD de las explotaciones agrarias.'),
('C024-0143',' en el diseño de las ciudades;',' MOVILIDAD; SOCIEDAD DE LA INFORMACIÓN, con la BRECHA DIGITAL DE GÉNERO; y DESARROLLO RURAL, con la COTITULARIDAD de las explotaciones agrarias.'),
('C024-0144','n la BRECHA DIGITAL DE GÉNERO;',' y DESARROLLO RURAL, con la COTITULARIDAD de las explotaciones agrarias.'),
('C024-0146','UBVENCIONES O AYUDAS PÚBLICAS;',' y fomento del asociacionismo, con posible declaración de UTILIDAD PÚBLICA.'),
('C024-0147','asociaciones y organizaciones;',' las que DISCRIMINEN A LAS MUJERES NO PODRÁN RECIBIR SUBVENCIONES O AYUDAS PÚBLICAS; y fomento del asociacionismo, con posible declaración de UTILIDAD PÚBLICA.'),
('C024-0149','lural y libre de estereotipos;',' medios de titularidad PÚBLICA, subvencionados o participados, con PLAN DE IGUALDAD ESPECÍFICO de la Corporación Aragonesa de Radio y Televisión y COMISIÓN DE IGUALDAD en su Consejo de Administración, cuyas decisiones serán PÚBLICAS; medios PRIVADOS, con autorregulación, formación y manual de estilo sobre el tratamiento de la violencia; y PUBLICIDAD ILÍCITA, con remisión a los arts. 14, 18 y 20.4 de la Constitución…'),
('C024-0150','yas decisiones serán PÚBLICAS;',' medios PRIVADOS, con autorregulación, formación y manual de estilo sobre el tratamiento de la violencia; y PUBLICIDAD ILÍCITA, con remisión a los arts. 14, 18 y 20.4 de la Constitución y prohibición de emitir publicidad que fomente o induzca a la prostitución en medios de titularidad pública.'),
('C024-0151','l tratamiento de la violencia;',' y PUBLICIDAD ILÍCITA, con remisión a los arts. 14, 18 y 20.4 de la Constitución y prohibición de emitir publicidad que fomente o induzca a la prostitución en medios de titularidad pública.'),
('C024-0154','ño de las ciudades; MOVILIDAD;',' SOCIEDAD DE LA INFORMACIÓN, con la BRECHA DIGITAL DE GÉNERO; y DESARROLLO RURAL, con la COTITULARIDAD de las explotaciones agrarias.'),
('C024-0155','ticas que atenten contra ella;',' integración de los principios de igualdad en la práctica profesional; formación continua; atención específica a mujeres con mayor riesgo de acumulación de factores de discriminación; SALUD SEXUAL Y REPRODUCTIVA, con acceso universal a la planificación familiar y atención en embarazo, parto, puerperio y lactancia; educación para la salud sexual; ESPACIOS Y UNIDADES INTERDISCIPLINARES; e INFORMES SANITARIOS…'),
('C024-0157','ofesional; formación continua;',' atención específica a mujeres con mayor riesgo de acumulación de factores de discriminación; SALUD SEXUAL Y REPRODUCTIVA, con acceso universal a la planificación familiar y atención en embarazo, parto, puerperio y lactancia; educación para la salud sexual; ESPACIOS Y UNIDADES INTERDISCIPLINARES; e INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS.'),
('C024-0158','de factores de discriminación;',' SALUD SEXUAL Y REPRODUCTIVA, con acceso universal a la planificación familiar y atención en embarazo, parto, puerperio y lactancia; educación para la salud sexual; ESPACIOS Y UNIDADES INTERDISCIPLINARES; e INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS.'),
('C024-0159',' parto, puerperio y lactancia;',' educación para la salud sexual; ESPACIOS Y UNIDADES INTERDISCIPLINARES; e INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS.'),
('C024-0160','Y UNIDADES INTERDISCIPLINARES;',' e INFORMES SANITARIOS DESAGREGADOS POR SEXO CADA CUATRO AÑOS.'),
('C024-0162','ticas que atenten contra ella;',' integración de los principios de igualdad en la práctica profesional; formación continua; atención específica a mujeres con mayor riesgo de acumulación de factores de discriminación; SALUD SEXUAL Y REPRODUCTIVA, con acceso universal a la planificación familiar y atención en embarazo, parto, puerperio y lactancia; educación para la salud sexual; ESPACIOS Y UNIDADES INTERDISCIPLINARES; e INFORMES SANITARIOS…'),
('C024-0171','ón de un PROTOCOLO ESPECÍFICO;',' las víctimas son beneficiarias de todos los derechos de la Ley 4/2007 aragonesa; se combatirá la publicidad de prostitución; y LA ADMINISTRACIÓN NO PODRÁ CONTRATAR ESPACIOS DE DIFUSIÓN NI INSERTAR PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS RELACIONADOS CON LA PROSTITUCIÓN.'),
('C024-0172','os de la Ley 4/2007 aragonesa;',' se combatirá la publicidad de prostitución; y LA ADMINISTRACIÓN NO PODRÁ CONTRATAR ESPACIOS DE DIFUSIÓN NI INSERTAR PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS RELACIONADOS CON LA PROSTITUCIÓN.'),
('C024-0174','la publicidad de prostitución;',' y LA ADMINISTRACIÓN NO PODRÁ CONTRATAR ESPACIOS DE DIFUSIÓN NI INSERTAR PUBLICIDAD INSTITUCIONAL EN MEDIOS QUE INCLUYAN ANUNCIOS RELACIONADOS CON LA PROSTITUCIÓN.'),
('C024-0197','ificar los hechos denunciados;',' EFECTUAR ENTREVISTAS CONCERTADAS O VISITAS DE INSPECCIÓN PERSONÁNDOSE LIBREMENTE Y SIN PREVIA NOTIFICACIÓN, SALVO DOMICILIOS PARTICULARES; proponer MEDIDAS CAUTELARES; proponer la INCOACIÓN de procedimientos sancionadores; controlar las actividades que hayan recibido AYUDA PÚBLICA del Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se determinen reglamentariamente.'),
('C024-0198','SALVO DOMICILIOS PARTICULARES;',' proponer MEDIDAS CAUTELARES; proponer la INCOACIÓN de procedimientos sancionadores; controlar las actividades que hayan recibido AYUDA PÚBLICA del Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se determinen reglamentariamente.'),
('C024-0199',' procedimientos sancionadores;',' controlar las actividades que hayan recibido AYUDA PÚBLICA del Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se determinen reglamentariamente.'),
('C024-0200','nstituto Aragonés de la Mujer;',' REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se determinen reglamentariamente.'),
('C024-0202','r y comprobar el cumplimiento;',' verificar los hechos denunciados; EFECTUAR ENTREVISTAS CONCERTADAS O VISITAS DE INSPECCIÓN PERSONÁNDOSE LIBREMENTE Y SIN PREVIA NOTIFICACIÓN, SALVO DOMICILIOS PARTICULARES; proponer MEDIDAS CAUTELARES; proponer la INCOACIÓN de procedimientos sancionadores; controlar las actividades que hayan recibido AYUDA PÚBLICA del Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se…'),
('C024-0203',' procedimientos sancionadores;',' controlar las actividades que hayan recibido AYUDA PÚBLICA del Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE INSPECCIÓN; y las demás que se determinen reglamentariamente.'),
('C024-0210','): retraso en el cumplimiento;',' no facilitar o negarse PARCIALMENTE a colaborar; dificultar o entorpecer la acción investigadora; no atender un requerimiento formal o hacerlo fuera de plazo sin perjuicio grave; no suministrar datos o hacerlo fuera de plazo sin perjuicio grave; suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0211','arse PARCIALMENTE a colaborar;',' dificultar o entorpecer la acción investigadora; no atender un requerimiento formal o hacerlo fuera de plazo sin perjuicio grave; no suministrar datos o hacerlo fuera de plazo sin perjuicio grave; suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0212','UTA a la acción investigadora;',' ACTUACIÓN DISCRIMINATORIA por razón de género que no sea delito; libros de texto y materiales didácticos que presenten a las personas como superiores o inferiores en dignidad según su sexo; LA UTILIZACIÓN SEXISTA DEL LENGUAJE EN DOCUMENTOS Y SOPORTES ADMINISTRATIVOS; la inobservancia de los programas formativos; campañas publicitarias vejatorias; información inexacta CON perjuicio grave; no suministrar datos CON…'),
('C024-0213','pecer la acción investigadora;',' no atender un requerimiento formal o hacerlo fuera de plazo sin perjuicio grave; no suministrar datos o hacerlo fuera de plazo sin perjuicio grave; suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0214',' de plazo sin perjuicio grave;',' no suministrar datos o hacerlo fuera de plazo sin perjuicio grave; suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0215',' inexacta CON perjuicio grave;',' no suministrar datos CON perjuicio grave; y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0216','ncompleta sin perjuicio grave;',' y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0217',' de plazo sin perjuicio grave;',' suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0219','retraso en el cumplimiento;',' no facilitar o negarse PARCIALMENTE a colaborar; dificultar o entorpecer la acción investigadora; no atender un requerimiento formal o hacerlo fuera de plazo sin perjuicio grave; no suministrar datos o hacerlo fuera de plazo sin perjuicio grave; suministrar información inexacta o incompleta sin perjuicio grave; y el incumplimiento no tipificado como grave o muy grave.'),
('C024-0220','n de género que no sea delito;',' libros de texto y materiales didácticos que presenten a las personas como superiores o inferiores en dignidad según su sexo; LA UTILIZACIÓN SEXISTA DEL LENGUAJE EN DOCUMENTOS Y SOPORTES ADMINISTRATIVOS; la inobservancia de los programas formativos; campañas publicitarias vejatorias; información inexacta CON perjuicio grave; no suministrar datos CON perjuicio grave; y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0221','OS Y SOPORTES ADMINISTRATIVOS;',' la inobservancia de los programas formativos; campañas publicitarias vejatorias; información inexacta CON perjuicio grave; no suministrar datos CON perjuicio grave; y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0222','IÓN públicos o subvencionados;',' EJERCER REPRESALIA O TRATO ADVERSO contra quien haya presentado queja, reclamación, denuncia, demanda o recurso; y REINCIDENCIA por dos o más graves en DOS AÑOS.'),
('C024-0223','res en dignidad según su sexo;',' LA UTILIZACIÓN SEXISTA DEL LENGUAJE EN DOCUMENTOS Y SOPORTES ADMINISTRATIVOS; la inobservancia de los programas formativos; campañas publicitarias vejatorias; información inexacta CON perjuicio grave; no suministrar datos CON perjuicio grave; y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0224','añas publicitarias vejatorias;',' información inexacta CON perjuicio grave; no suministrar datos CON perjuicio grave; y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0225','rar datos CON perjuicio grave;',' y REINCIDENCIA por dos o más leves en DOS AÑOS.'),
('C024-0227','vo, siempre que no sea delito;',' no suministrar o falsear información obligatoria CON DOLO O NEGLIGENCIA GRAVE; CUALQUIER TRATO DESFAVORABLE EN RELACIÓN CON EL EMBARAZO O LA MATERNIDAD; uso sexista del lenguaje o imágenes en MEDIOS DE COMUNICACIÓN públicos o subvencionados; EJERCER REPRESALIA O TRATO ADVERSO contra quien haya presentado queja, reclamación, denuncia, demanda o recurso; y REINCIDENCIA por dos o más graves en DOS AÑOS.'),
('C024-0228',' CON DOLO O NEGLIGENCIA GRAVE;',' CUALQUIER TRATO DESFAVORABLE EN RELACIÓN CON EL EMBARAZO O LA MATERNIDAD; uso sexista del lenguaje o imágenes en MEDIOS DE COMUNICACIÓN públicos o subvencionados; EJERCER REPRESALIA O TRATO ADVERSO contra quien haya presentado queja, reclamación, denuncia, demanda o recurso; y REINCIDENCIA por dos o más graves en DOS AÑOS.'),
('C024-0229','N EL EMBARAZO O LA MATERNIDAD;',' uso sexista del lenguaje o imágenes en MEDIOS DE COMUNICACIÓN públicos o subvencionados; EJERCER REPRESALIA O TRATO ADVERSO contra quien haya presentado queja, reclamación, denuncia, demanda o recurso; y REINCIDENCIA por dos o más graves en DOS AÑOS.'),
('C024-0230',', denuncia, demanda o recurso;',' y REINCIDENCIA por dos o más graves en DOS AÑOS.'),
('C024-0234',' 30.000 EUROS, más accesorias:',' prohibición de acceso a ayudas públicas HASTA TRES AÑOS; inhabilitación temporal HASTA TRES AÑOS para ser titular de centros o servicios públicos; cierre o suspensión temporal HASTA TRES AÑOS.'),
('C024-0235',' 50.000 EUROS, más accesorias:',' prohibición de ayudas DE TRES A CINCO AÑOS; inhabilitación DE TRES A CINCO AÑOS; cierre o suspensión HASTA CINCO AÑOS.'),
('C024-0236','udas públicas HASTA TRES AÑOS;',' inhabilitación temporal HASTA TRES AÑOS para ser titular de centros o servicios públicos; cierre o suspensión temporal HASTA TRES AÑOS.'),
('C024-0237',' centros o servicios públicos;',' cierre o suspensión temporal HASTA TRES AÑOS.'),
('C024-0239','litación DE TRES A CINCO AÑOS;',' cierre o suspensión HASTA CINCO AÑOS.'),
('C024-0241','ntencionalidad o reincidencia;',' TRASCENDENCIA SOCIAL y número de personas afectadas; incumplimiento de advertencias previas; BENEFICIO OBTENIDO; y REPARACIÓN VOLUNTARIA antes de la resolución definitiva.'),
('C024-0242','iento de advertencias previas;',' BENEFICIO OBTENIDO; y REPARACIÓN VOLUNTARIA antes de la resolución definitiva.'),
('C024-0252','AMENTO competente en igualdad;',' MUY GRAVES, EL GOBIERNO DE ARAGÓN.'),
('C024-0253','ECTIVO competente en igualdad;',' GRAVES, el DEPARTAMENTO competente en igualdad; MUY GRAVES, EL GOBIERNO DE ARAGÓN.'),
('C024-0258','arán COMO MÍNIMO SIETE REGLAS:','
1. ELUDIR EL MASCULINO GENÉRICO siempre que sea posible.
2. FEMINIZAR LOS TÉRMINOS.
3. Utilizar términos ABSTRACTOS, GENÉRICOS, COLECTIVOS, PERÍFRASIS O METONIMIAS.
4. OMITIR DETERMINANTES MARCADOS, cuando no produzca ambigüedad o indeterminación.
5. Optar por la SIMETRÍA EN EL TRATAMIENTO.
6. Incorporar ESTRATEGIAS DE LEGIBILIDAD.
7. Recurrir a FÓRMULAS DE DESDOBLAMIENTO ÚNICAMENTE cuando vengan exigidas para…'),
('C024-0293','UTA a la acción investigadora;',' ACTUACIÓN DISCRIMINATORIA por razón de género que no sea delito; libros de texto y materiales didácticos que presenten a las personas como superiores o inferiores en dignidad según su sexo; LA UTILIZACIÓN SEXISTA DEL LENGUAJE EN DOCUMENTOS Y SOPORTES ADMINISTRATIVOS; la inobservancia de los programas formativos; campañas publicitarias vejatorias; información inexacta CON perjuicio grave; no suministrar datos CON…'),
('C025-0050','S. OCHO, numeradas del 1 al 8:',' velar, vigilar y comprobar el cumplimiento; verificar los hechos denunciados; efectuar ENTREVISTAS CONCERTADAS O VISITAS DE INSPECCIÓN, personándose LIBREMENTE Y SIN PREVIA NOTIFICACIÓN, SALVO DOMICILIOS PARTICULARES; PROPONER MEDIDAS CAUTELARES; PROPONER LA INCOACIÓN de los procedimientos sancionadores; controlar las actividades subvencionadas por el Instituto Aragonés de la Mujer; REDACTAR Y REMITIR LAS ACTAS DE…'),
('C025-0086',' 30.000 EUROS, más accesorias:',' prohibición de acceso a ayudas públicas HASTA TRES AÑOS; inhabilitación temporal HASTA TRES AÑOS; cierre o suspensión temporal HASTA TRES AÑOS.'),
('C025-0087',' 50.000 EUROS, más accesorias:',' prohibición de ayudas DE TRES A CINCO AÑOS; inhabilitación DE TRES A CINCO AÑOS; cierre o suspensión HASTA CINCO AÑOS.'),
('C026-0004','S ESTABLECIDOS A CONTINUACIÓN:','
a) PUBLICIDAD DE LAS CONVOCATORIAS Y DE SUS BASES.
b) TRANSPARENCIA.
c) IMPARCIALIDAD Y PROFESIONALIDAD de los miembros de los órganos de selección.
d) INDEPENDENCIA Y DISCRECIONALIDAD TÉCNICA en la actuación de los órganos de selección.
e) ADECUACIÓN ENTRE EL CONTENIDO DE LOS PROCESOS SELECTIVOS Y LAS FUNCIONES O TAREAS a desarrollar.
f) AGILIDAD, SIN PERJUICIO DE LA OBJETIVIDAD, en los procesos'),
('C026-0016','nir los siguientes requisitos:','
a) Tener la NACIONALIDAD ESPAÑOLA, sin perjuicio de lo dispuesto en el artículo siguiente.
b) Poseer la CAPACIDAD FUNCIONAL para el desempeño de las tareas.
c) Tener cumplidos DIECISÉIS AÑOS y NO EXCEDER, en su caso, de la EDAD MÁXIMA DE JUBILACIÓN FORZOSA. SÓLO POR LEY podrá establecerse otra edad máxima, distinta de la de jubilación forzosa, para el acceso al empleo público.
d) NO HABER SIDO SEP'),
('C026-0079',' DE LOS SIGUIENTES REQUISITOS:','
a) SUPERACIÓN DEL PROCESO SELECTIVO.
b) NOMBRAMIENTO por el órgano o autoridad competente, QUE SERÁ PUBLICADO EN EL DIARIO OFICIAL correspondiente.
c) ACTO DE ACATAMIENTO DE LA CONSTITUCIÓN y, en su caso, del ESTATUTO DE AUTONOMÍA correspondiente y del RESTO DEL ORDENAMIENTO JURÍDICO.
d) TOMA DE POSESIÓN dentro del plazo que se establezca.
2. No podrán ser funcionarios y quedarán SIN EFECTO las ac'),
('C026-0087','ión de funcionario de carrera:','
a) La RENUNCIA a la condición de funcionario.
b) La PÉRDIDA DE LA NACIONALIDAD.
c) La JUBILACIÓN TOTAL del funcionario.
d) La SANCIÓN DISCIPLINARIA DE SEPARACIÓN DEL SERVICIO QUE TUVIERE CARÁCTER FIRME.
e) La PENA PRINCIPAL O ACCESORIA DE INHABILITACIÓN ABSOLUTA O ESPECIAL PARA CARGO PÚBLICO QUE TUVIERE CARÁCTER FIRME.'),
('C026-0121','de las siguientes situaciones:','
a) SERVICIO ACTIVO.
b) SERVICIOS ESPECIALES.
c) SERVICIO EN OTRAS ADMINISTRACIONES PÚBLICAS.
d) EXCEDENCIA.
e) SUSPENSIÓN DE FUNCIONES.
2. Las leyes de Función Pública PODRÁN REGULAR OTRAS SITUACIONES ADMINISTRATIVAS cuando concurra, ENTRE OTRAS, alguna de estas circunstancias:
a) Cuando por RAZONES ORGANIZATIVAS, DE REESTRUCTURACIÓN INTERNA O EXCESO DE PERSONAL resulte una IMPOSIBILIDAD TRANSITOR'),
('C026-0142','Conferencia Sectorial del art.',' 84 o, en su defecto, por la Administración en que se produzca el reingreso.'),
('C026-0143','OCE supuestos, letras a) a l):','
a) MIEMBROS DEL GOBIERNO o de los órganos de gobierno de las comunidades autónomas y de Ceuta y Melilla, miembros de las INSTITUCIONES DE LA UNIÓN EUROPEA o de organizaciones internacionales, o nombrados ALTOS CARGOS.
b) Autorizados para realizar una MISIÓN POR PERIODO DETERMINADO SUPERIOR A SEIS MESES en organismos internacionales, gobiernos o entidades públicas extranjeras o en programas de cooperación…'),
('C026-0164','NCO MODALIDADES de excedencia:','
a) Excedencia VOLUNTARIA POR INTERÉS PARTICULAR.
b) Excedencia VOLUNTARIA POR AGRUPACIÓN FAMILIAR.
c) Excedencia POR CUIDADO DE FAMILIARES.
d) Excedencia POR RAZÓN DE VIOLENCIA DE GÉNERO O DE VIOLENCIA SEXUAL.
e) Excedencia POR RAZÓN DE VIOLENCIA TERRORISTA.'),
('C026-0213','JENA y los asimilados del art.',' 7.1.a), SALVO que por razón de su actividad deban quedar comprendidos en un RÉGIMEN ESPECIAL.'),
('C026-0214',' en DIECISIETE letras a) a q):','
k) El PERSONAL CIVIL NO FUNCIONARIO de las administraciones públicas y de las entidades y organismos vinculados o dependientes de ellas, siempre que no estén incluidos por ley especial en otro régimen obligatorio de previsión social.
l) EL PERSONAL FUNCIONARIO AL SERVICIO DE LAS ADMINISTRACIONES PÚBLICAS y de las entidades y organismos vinculados o dependientes de ellas, INCLUIDO SU PERIODO DE PRÁCTICAS, SALVO QUE…'),
('C026-0230','DAD ejecutados ocasionalmente;',' b) los que den lugar a inclusión en un RÉGIMEN ESPECIAL; c) los realizados por PROFESORES UNIVERSITARIOS EMÉRITOS y por el personal licenciado sanitario emérito.'),
('C026-0231','lusión en un RÉGIMEN ESPECIAL;',' c) los realizados por PROFESORES UNIVERSITARIOS EMÉRITOS y por el personal licenciado sanitario emérito.'),
('C026-0235',' DE 2011, el personal del art.',' 2.1 del texto refundido de la Ley de Clases Pasivas del Estado, EXCEPCIÓN HECHA DEL COMPRENDIDO EN LA LETRA i), estará OBLIGATORIAMENTE INCLUIDO en el Régimen General de la Seguridad Social SIEMPRE QUE EL ACCESO A LA CONDICIÓN DE QUE SE TRATE SE PRODUZCA A PARTIR DE AQUELLA FECHA.'),
('C027-0007','siguientes ENTIDADES GESTORAS:','
a) EL INSTITUTO NACIONAL DE LA SEGURIDAD SOCIAL, para las PRESTACIONES ECONÓMICAS del sistema, con excepción de las de la letra c).
b) EL INSTITUTO NACIONAL DE GESTIÓN SANITARIA, para la administración y gestión de SERVICIOS SANITARIOS.
c) EL INSTITUTO DE MAYORES Y SERVICIOS SOCIALES, para las PENSIONES NO CONTRIBUTIVAS DE INVALIDEZ Y JUBILACIÓN y los servicios complementarios.'),
('C027-0048','2. OBJETO, SEIS letras:',' a) contingencias de ACCIDENTES DE TRABAJO Y ENFERMEDADES PROFESIONALES, incluida la asistencia sanitaria y la rehabilitación, y las actividades de prevención; b) INCAPACIDAD TEMPORAL DERIVADA DE CONTINGENCIAS COMUNES; c) RIESGO DURANTE EL EMBARAZO Y RIESGO DURANTE LA LACTANCIA NATURAL; d) CESE DE ACTIVIDAD de los autónomos; e) CUIDADO DE MENORES AFECTADOS POR CÁNCER u otra enfermedad grave; f) las demás que les…'),
('C027-0049','VADA DE CONTINGENCIAS COMUNES;',' c) RIESGO DURANTE EL EMBARAZO Y RIESGO DURANTE LA LACTANCIA NATURAL; d) CESE DE ACTIVIDAD de los autónomos; e) CUIDADO DE MENORES AFECTADOS POR CÁNCER u otra enfermedad grave; f) las demás que les sean atribuidas legalmente.'),
('C027-0051',' DURANTE LA LACTANCIA NATURAL;',' d) CESE DE ACTIVIDAD de los autónomos; e) CUIDADO DE MENORES AFECTADOS POR CÁNCER u otra enfermedad grave; f) las demás que les sean atribuidas legalmente.'),
('C027-0056','NSTITUCIÓN. CUATRO REQUISITOS:',' a) MÍNIMO DE CINCUENTA EMPRESARIOS, con un mínimo de TREINTA MIL TRABAJADORES y un volumen de cotización por contingencias profesionales NO INFERIOR A VEINTE MILLONES DE EUROS; b) limitar su actividad a las funciones del art. 80; c) PRESTAR FIANZA; d) AUTORIZACIÓN del Ministerio, previa aprobación de estatutos, e INSCRIPCIÓN en el Registro de Mutuas. La orden de autorización SE PUBLICA EN EL BOE, adquiriendo desde…'),
('C027-0059','el art. 80; c) PRESTAR FIANZA;',' d) AUTORIZACIÓN del Ministerio, previa aprobación de estatutos, e INSCRIPCIÓN en el Registro de Mutuas.'),
('C027-0111','E LAS EMPRESAS, en DOS formas:',' a) ASUMIENDO DIRECTAMENTE A SU CARGO el pago de las prestaciones por incapacidad temporal derivada de ACCIDENTE DE TRABAJO Y ENFERMEDAD PROFESIONAL y la asistencia sanitaria y recuperación profesional; b) PAGANDO A SUS TRABAJADORES, A CARGO DE LA ENTIDAD GESTORA O MUTUA, las prestaciones económicas por incapacidad temporal. Esta segunda puede establecerse CON CARÁCTER OBLIGATORIO.'),
('C027-0113','ENTE DE TRABAJO, siete letras:','
a) Los que sufra AL IR O AL VOLVER DEL LUGAR DE TRABAJO (accidente in itinere).
b) Los sufridos con ocasión del desempeño de CARGOS ELECTIVOS DE CARÁCTER SINDICAL, y los ocurridos al ir o volver del lugar de esas funciones.
c) Los ocurridos con ocasión de TAREAS DISTINTAS A LAS DE SU GRUPO PROFESIONAL que ejecute en cumplimiento de ÓRDENES DEL EMPRESARIO o ESPONTÁNEAMENTE EN INTERÉS DEL BUEN FUNCI'),
('C027-0168','DEL EMBARAZO, voluntaria o no;',' GESTACIÓN DESDE EL DÍA PRIMERO DE LA SEMANA TRIGÉSIMA NOVENA; y DONACIÓN DE ÓRGANOS O TEJIDOS para trasplante.'),
('C027-0177','ÑOS inmediatamente anteriores;',' b) ACCIDENTE, SEA O NO DE TRABAJO, Y ENFERMEDAD PROFESIONAL, NINGÚN PERÍODO PREVIO.'),
('C027-0187','ión de incapacidad permanente;',' por reconocimiento de la pensión de jubilación; por INCOMPARECENCIA INJUSTIFICADA a los reconocimientos; o por fallecimiento.'),
('C027-0215','ón de la capacidad de trabajo:','
a) INCAPACIDAD PERMANENTE PARCIAL.
b) INCAPACIDAD PERMANENTE TOTAL.
c) INCAPACIDAD PERMANENTE ABSOLUTA.
d) GRAN INCAPACIDAD.
Se atiende a la incidencia de la reducción EN LA PROFESIÓN QUE EJERCÍA EL INTERESADO o en el grupo profesional.'),
('C027-0216','ón de la capacidad de trabajo:','
a) INCAPACIDAD PERMANENTE PARCIAL.
b) INCAPACIDAD PERMANENTE TOTAL.
c) INCAPACIDAD PERMANENTE ABSOLUTA.
d) GRAN INCAPACIDAD.
Se atiende a la incidencia de la reducción EN LA PROFESIÓN QUE EJERCÍA EL INTERESADO o en el grupo profesional.'),
('C027-0256','QUINCE AÑOS, EL 50 POR CIENTO;',' a partir del año decimosexto, 0,19 POR CIENTO por cada mes adicional hasta el mes 248, y 0,18 POR CIENTO por cada uno que rebase ese mes, SIN SUPERAR EL 100 POR CIEN.'),
('C027-0312','el art. 80; c) PRESTAR FIANZA;',' d) AUTORIZACIÓN del Ministerio, previa aprobación de estatutos, e INSCRIPCIÓN en el Registro de Mutuas.'),
('C027-0314','% a la RESERVA COMPLEMENTARIA,',' 10 % a la RESERVA DE ASISTENCIA SOCIAL y 80 % AL FONDO DE RESERVA DE LA SEGURIDAD SOCIAL.'),
('C028-0190','CCIÓN Y PREVENCIÓN aplicables;',' c) LAS MEDIDAS DE EMERGENCIA del art. 20.'),
('C028-0206','NES DE TRABAJO SOBRE LA SALUD;','
- que sirvan para VERIFICAR SI EL ESTADO DE SALUD DEL TRABAJADOR PUEDE CONSTITUIR UN PELIGRO PARA ÉL MISMO, PARA LOS DEMÁS TRABAJADORES O PARA OTRAS PERSONAS relacionadas con la empresa;
- o que ASÍ ESTÉ ESTABLECIDO EN UNA DISPOSICIÓN LEGAL en relación con la protección de riesgos específicos y ACTIVIDADES DE ESPECIAL PELIGROSIDAD.'),
('C028-0255',').
- Ley 7/2018 de Aragón art.',' 48: seguridad y salud laboral CON PERSPECTIVA DE GÉNERO (nodo 7.6).'),
('C028-0260','el empresario está obligado a:','
a) INFORMAR LO ANTES POSIBLE a todos los trabajadores afectados de la existencia del riesgo y de las medidas adoptadas.
b) ADOPTAR LAS MEDIDAS Y DAR LAS INSTRUCCIONES necesarias para que, EN CASO DE PELIGRO GRAVE, INMINENTE E INEVITABLE, los trabajadores PUEDAN INTERRUMPIR SU ACTIVIDAD Y, SI FUERA NECESARIO, ABANDONAR DE INMEDIATO EL LUGAR DE TRABAJO. NO PODRÁ EXIGIRSE QUE REANUDEN SU ACTIVIDAD MI'),
('C029-0068','- Han cumplido los 55 AÑOS, o','
- Por motivos de salud y previo informe avalado por una DECISIÓN MÉDICA, no pueden desempeñar adecuadamente las funciones de atención a emergencias.'),
('C029-0073','del Cuerpo de Intervención que',':
- Han cumplido los 55 AÑOS, o
- Por motivos de salud y previo informe avalado por una DECISIÓN MÉDICA, no pueden desempeñar adecuadamente las funciones de atención a emergencias.'),
('C029-0169','Y SE EJERCEN EN DOS ÁMBITOS:','
1. EN EL RESCATE (o «en el rescate acuático», en el buceador).
2. EN EL TRABAJO DE PARQUE.
El guía canino añade un TERCER ámbito: «OTROS», referido al cuidado del perro.'),
('C029-0170','ALIDADES, en el orden del PDF:','
1. ESPECIALIDAD DE RESCATE ACUÁTICO. BOMBERO BUCEADOR.
2. AUXILIAR DE AMBULANCIA.
3. ESPECIALISTA EN RESCATE VERTICAL.
4. ESPECIALISTA DE GUÍA CANINO.'),
('C029-0197','. Funciones que el PDF recoge:','
1. CONOCER el material, los aparatos y la MEDICACIÓN de que dispone la ambulancia, sus características principales, funcionamiento y ubicación.
2. REVISAR la ambulancia AL COMIENZO DE CADA TURNO de trabajo.
3. COMPROBAR el funcionamiento del material sanitario y del vehículo: luces, pilotos, sirenas, radioteléfono, emisora, teléfono móvil.
4. COMPROBAR EXISTENCIAS del material y reponerlo si fuera'),
('C029-0203','funciones principales, CUATRO:','
1. COORDINAR Y DIRIGIR LOS SALVAMENTOS en su turno de trabajo.
2. COLABORAR en la elaboración del PROGRAMA DE PRÁCTICAS y en la ejecución de las mismas.
3. SUSTITUIR A LOS COORDINADORES en ausencia de éstos.
4. COORDINAR Y DIRIGIR LAS PRÁCTICAS en sus respectivos turnos, COMUNICANDO A LOS COORDINADORES las prácticas realizadas.'),
('C029-0306','ERAL a las diferentes escalas:','
a) CUERPO DE INSPECCIÓN: funciones de dirección e inspección y coordinación de unidades técnicas y operativas DE NIVEL SUPERIOR, y otras específicas.
b) CUERPO DE MANDO: funciones de PLANIFICACIÓN Y ORDENACIÓN de unidades operativas, y otras específicas.
c) CUERPO DE INTERVENCIÓN: funciones operativas DE NIVEL BÁSICO y otras específicas PARA LA CATEGORÍA DE BOMBERO, y operativas y administrativas'),
('C029-0314','
- Han cumplido los 55 AÑOS, o','
- Por motivos de salud y previo informe avalado por una DECISIÓN MÉDICA, no pueden desempeñar adecuadamente las funciones de atención a emergencias.'),
('C029-0337','3. CATEGORÍAS de cada uno:','
a) INSPECCIÓN: Inspector y Subinspector. (DOS)
b) MANDO: Jefe de Mando y Subjefe de Mando. (DOS)
c) INTERVENCIÓN: Jefe de Intervención, Subjefe de Intervención, OFICIAL y BOMBERO. (CUATRO)'),
('C029-0379','ción y extinción de incendios;',' f) estudio e investigación de sistemas y técnicas; g) salvamento acuático y subacuático y en cavidades o grutas; h) tráfico y accidentes de carretera, ferroviarios o aéreos; i) rescate y salvamento en el medio natural; j) investigación e información sobre causas, desarrollo y daños; k) obtención de información; l) medidas de seguridad extraordinarias y provisionales de cierre, desalojo y evacuación A LA ESPERA de…'),
('C029-0383','da literalmente en las cuatro:',' LAS FUNCIONES DE LA ESPECIALIDAD NO SON EXCLUYENTES, SINO QUE SE SUPERPONEN a las propias del bombero o a las del cargo que se desempeñe en el Servicio.'),
('C029-0387','mediante tres acciones:','
a) ACERCAR el material adecuado.
   b) PREPARAR PARA SU ADMINISTRACIÓN todo tipo de fármacos y sueros.
   c) REALIZAR TODAS LAS MANIOBRAS DE SOPORTE VITAL BÁSICO.
8. AYUDAR EN LA RECOPILACIÓN DE DATOS del paciente y pormenores de la intervención.
9. AYUDAR EN LA TRANSFERENCIA del paciente al hospital.
10. REPOSICIÓN del material estropeado y sucio y de la medicación empleada.'),
('C030-0001','ETE funciones, letras a) a q):','
a) ASISTIR a las intervenciones y servicios asignados y desarrollar los trabajos encomendados.
b) VELAR POR LA SEGURIDAD de las personas afectadas por el siniestro Y DE SUS COMPAÑEROS, aplicando criterios de EFICACIA, SEGURIDAD Y PROPORCIONALIDAD.
c) CONDUCIR aquellos vehículos del Parque para los que sea necesario EL PERMISO DE CONDUCCIÓN QUE SE LE EXIGIÓ EN EL PROCESO DE SELECCIÓN.
d) MANIPULAR'),
('C030-0024','IEZ funciones, letras a) a j):','
a) ASISTIR Y DIRIGIR las intervenciones que se produzcan de acuerdo con los procedimientos establecidos, ASUMIENDO EL MANDO de la misma.
b) VALORAR Y COMUNICAR al superior jerárquico la situación de la intervención, indicando las actuaciones operativas y SOLICITANDO MEDIOS DE APOYO si lo considera procedente.
c) REALIZAR LA TOMA DE DATOS de la intervención.
d) SUPERVISAR Y ORDENAR la terminación d'),
('C030-0036','CIÓN. OCHO funciones, a) a h):','
a) Dirigir, organizar y coordinar los recursos humanos y materiales EN SU ÁREA GEOGRÁFICA DE RESPONSABILIDAD.
b) Asumir la dirección de las intervenciones cuando LA COMPLEJIDAD O SIMULTANEIDAD lo requieran.
c) Verificar la correcta MOVILIZACIÓN DE RECURSOS al lugar de la intervención.
d) Dirigir, organizar y coordinar la PLANIFICACIÓN FORMATIVA.
e) DOCUMENTAR Y EVALUAR los incidentes y accidentes laborales del…'),
('C030-0037','IÓN. SIETE funciones, a) a g):','
a) DIRIGIR LOS EQUIPOS DE INTERVENCIÓN producidos en su área geográfica de intervención.
b) Asistir a los siniestros CUANDO LE SEA ORDENADO.
c) SUSTITUIR AL JEFE DE INTERVENCIÓN cuando sea requerido para ello POR EL JEFE DEL SERVICIO.
d) DIRIGIR PERSONALMENTE la formación teórica, práctica y de maniobras del personal, supervisando el cumplimiento del horario de trabajo.
e) Supervisar el mantenimie'),
('C030-0053','CTOR. DOCE funciones, a) a l):',' planificación, dirección, gestión y control del servicio; elaborar la PROPUESTA DE PRESUPUESTO ANUAL; ejecutar el presupuesto aprobado; ostentar la responsabilidad de la EFICACIA Y CALIDAD del Servicio; planificar la formación y coordinarla CON LA ACADEMIA ARAGONESA DE BOMBEROS; dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los…'),
('C030-0054','estión y control del servicio;',' elaborar la PROPUESTA DE PRESUPUESTO ANUAL; ejecutar el presupuesto aprobado; ostentar la responsabilidad de la EFICACIA Y CALIDAD del Servicio; planificar la formación y coordinarla CON LA ACADEMIA ARAGONESA DE BOMBEROS; dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los recursos humanos; coordinar las acciones de los responsables…'),
('C030-0055','cutar el presupuesto aprobado;',' ostentar la responsabilidad de la EFICACIA Y CALIDAD del Servicio; planificar la formación y coordinarla CON LA ACADEMIA ARAGONESA DE BOMBEROS; dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los recursos humanos; coordinar las acciones de los responsables definiendo criterios generales; APROBAR LOS CUADRANTES DE SERVICIO; presentar la…'),
('C030-0056','ción del presupuesto de gasto;',' organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0057','ICACIA Y CALIDAD del Servicio;',' planificar la formación y coordinarla CON LA ACADEMIA ARAGONESA DE BOMBEROS; dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los recursos humanos; coordinar las acciones de los responsables definiendo criterios generales; APROBAR LOS CUADRANTES DE SERVICIO; presentar la MEMORIA ANUAL; cumplimentar informes; PROPONER LA INCOACIÓN DE…'),
('C030-0058','CADEMIA ARAGONESA DE BOMBEROS;',' dirigir todos los medios y recursos tanto en normalidad como en emergencias que requieran su presencia; supervisar el control de los recursos humanos; coordinar las acciones de los responsables definiendo criterios generales; APROBAR LOS CUADRANTES DE SERVICIO; presentar la MEMORIA ANUAL; cumplimentar informes; PROPONER LA INCOACIÓN DE EXPEDIENTES DISCIPLINARIOS Y LA IMPOSICIÓN DE SANCIONES POR FALTAS LEVES.'),
('C030-0059','as que requieran su presencia;',' supervisar el control de los recursos humanos; coordinar las acciones de los responsables definiendo criterios generales; APROBAR LOS CUADRANTES DE SERVICIO; presentar la MEMORIA ANUAL; cumplimentar informes; PROPONER LA INCOACIÓN DE EXPEDIENTES DISCIPLINARIOS Y LA IMPOSICIÓN DE SANCIONES POR FALTAS LEVES.'),
('C030-0060','efiniendo criterios generales;',' APROBAR LOS CUADRANTES DE SERVICIO; presentar la MEMORIA ANUAL; cumplimentar informes; PROPONER LA INCOACIÓN DE EXPEDIENTES DISCIPLINARIOS Y LA IMPOSICIÓN DE SANCIONES POR FALTAS LEVES.'),
('C030-0061','AR LOS CUADRANTES DE SERVICIO;',' presentar la MEMORIA ANUAL; cumplimentar informes; PROPONER LA INCOACIÓN DE EXPEDIENTES DISCIPLINARIOS Y LA IMPOSICIÓN DE SANCIONES POR FALTAS LEVES.'),
('C030-0062',' ANUAL; cumplimentar informes;',' PROPONER LA INCOACIÓN DE EXPEDIENTES DISCIPLINARIOS Y LA IMPOSICIÓN DE SANCIONES POR FALTAS LEVES.'),
('C030-0065','CTOR. DIEZ funciones, a) a j):',' planificar la actividad y medios de la escala de Intervención y Mando; elaborar y coordinar procedimientos de gestión de calidad; coordinar las comisiones de trabajo; EVALUAR la ejecución del Plan de formación; seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de…'),
('C030-0066','scala de Intervención y Mando;',' elaborar y coordinar procedimientos de gestión de calidad; coordinar las comisiones de trabajo; EVALUAR la ejecución del Plan de formación; seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y…'),
('C030-0067','mientos de gestión de calidad;',' coordinar las comisiones de trabajo; EVALUAR la ejecución del Plan de formación; seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento;…'),
('C030-0068','ecución del Plan de formación;',' seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0069','ecución del Plan de formación;',' seguimiento de la ejecución del presupuesto de gasto; organizar las actividades de carácter preventivo; SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0070','OORDINAR el Plan de formación;',' planificar y organizar los recursos humanos para cumplir los objetivos de intervención; proponer al Jefe de Servicio la ADQUISICIÓN de materiales, vehículos, vestuario y EPI; coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la…'),
('C030-0071','ecución del Plan de Formación;',' coordinar y supervisar la actividad de los grupos de intervención; conocer y tramitar PERMISOS, LICENCIAS, VACACIONES, BAJAS Y ALTAS por enfermedad; coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0072','idades de carácter preventivo;',' SUSTITUIR AL JEFE DEL SERVICIO en su ausencia; evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0073','E DEL SERVICIO en su ausencia;',' evaluar la aplicación de los procedimientos de intervención; cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0074','rocedimientos de intervención;',' cumplir y hacer cumplir funciones, normas de uniformidad y conducta, convivencia, Seguridad e Higiene y perfeccionamiento; establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0075','e Higiene y perfeccionamiento;',' establecer cauces de comunicación para la sensibilización ciudadana.'),
('C030-0077','NDO. NUEVE funciones, a) a i):',' planificar los PROCEDIMIENTOS OPERATIVOS de intervenciones; ELABORAR Y COORDINAR el Plan de formación; planificar y organizar los recursos humanos para cumplir los objetivos de intervención; proponer al Jefe de Servicio la ADQUISICIÓN de materiales, vehículos, vestuario y EPI; coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES…'),
('C030-0078',' OPERATIVOS de intervenciones;',' ELABORAR Y COORDINAR el Plan de formación; planificar y organizar los recursos humanos para cumplir los objetivos de intervención; proponer al Jefe de Servicio la ADQUISICIÓN de materiales, vehículos, vestuario y EPI; coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y…'),
('C030-0079','los objetivos de intervención;',' proponer al Jefe de Servicio la ADQUISICIÓN de materiales, vehículos, vestuario y EPI; coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del…'),
('C030-0080','s, vehículos, vestuario y EPI;',' coordinar la SEGURIDAD Y SALUD en los centros de trabajo; elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0081','LUD en los centros de trabajo;',' elaborar informes de planificación, proyectos y métodos; INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0082','ficación, proyectos y métodos;',' INFORMAR SOBRE LOS PLANES DE AUTOPROTECCIÓN y las condiciones de prevención y protección contra incendios; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0083','y protección contra incendios;',' dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0085','ANDO. OCHO funciones, a) a h):',' colaborar con el Jefe de mando en la planificación de procedimientos operativos y supervisar su implantación; COORDINAR Y SUPERVISAR la ejecución del Plan de Formación; coordinar y supervisar la actividad de los grupos de intervención; conocer y tramitar PERMISOS, LICENCIAS, VACACIONES, BAJAS Y ALTAS por enfermedad; coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la…'),
('C030-0086',' y supervisar su implantación;',' COORDINAR Y SUPERVISAR la ejecución del Plan de Formación; coordinar y supervisar la actividad de los grupos de intervención; conocer y tramitar PERMISOS, LICENCIAS, VACACIONES, BAJAS Y ALTAS por enfermedad; coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra…'),
('C030-0087','de los grupos de intervención;',' conocer y tramitar PERMISOS, LICENCIAS, VACACIONES, BAJAS Y ALTAS por enfermedad; coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0088',' BAJAS Y ALTAS por enfermedad;',' coordinar y supervisar la ENTREGA Y DISTRIBUCIÓN de vestuario, equipos y materiales; colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0089','stuario, equipos y materiales;',' colaborar en la elaboración de informes; dirigir la intervención cuando lo requiera el Jefe del Servicio; cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0090','requiera el Jefe del Servicio;',' cualquier otra encomendada por el Jefe del Servicio.'),
('C030-0120','os de la Zona de Intervención;',' si es necesario, recursos especiales o no asignados a la Zona, cuyo tiempo dependerá de su ubicación y movilidad.')) as v(id, cola, ext)
  where b.id = v.id and right(b.cita, 30) = v.cola and (b.editada_at is null or b.id = 'C001-0021')
  returning 1)
select 'lote 3: ' || count(*) || ' de 160 citas ampliadas' as resultado from u;
