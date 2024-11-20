const pool = require("../dataBase/conexion");
const { allClassStudent } = require("./classStudentController");
const { responseFilter } = require("../utils/response");

const obtainDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const averangeUser = (idUser, listNotes) => {
  let averange = 0;
  listNotes.forEach((element) => {
    if (element.idUser === idUser) {
      averange += element.note;
    }
  });
  return averange;
};

const totalNote = (listStudents, listNotes) => {
  for (let i = 0; i < listStudents.length; i++) {
    let user = averangeUser(listStudents[i], listNotes);
  }
};

const dataSearh = async (search, data) => {
  switch (search) {
    case "listEvent":
      const [info] = await pool.query(
        `SELECT l.idListEvent, l.hourEvent, l.dateNews, l.title, l.body, l.stateEvent, l.urlPicture 
        FROM listEvents l WHERE l.dateNews BETWEEN ? AND ? ORDER BY l.dateNews ${data.order}`,
        [
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
          data.state,
        ]
      );
      return info;

    case "contact":
      const [contacts] = await pool.query(
        `SELECT * FROM sendContact WHERE dateContact BETWEEN ? AND ? AND stateContact = ? ORDER BY dateContact ${data.order}`,
        [
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
          data.state,
        ]
      );
      return contacts;

    case "typeClass":
      const [typeClass] = await pool.query(
        `SELECT * FROM typeClass ORDER BY nameClass ${data.order}`
      );
      return typeClass;

    case "hours":
      let queryHours = `SELECT * FROM hours WHERE stateHours = ${data.state}`;

      if (data.order) {
        queryHours += ` ORDER BY totalTime ${data.order}`;
      }

      const [hours] = await pool.query(queryHours);
      return hours;

    case "user":
      let query = `SELECT s.idUser, s.idLevel, l.nameLevel, s.idExtension, e.department, s.nameUser,  s.lastNameUser,  s.emailUser,  s.addressUser, s.dateBirthUser,  s.carnetUser, s.numberPhone, s.photoUser,  s.stateUser FROM user s, extension e, level l WHERE s.idExtension = e.idExtension AND s.idLevel = l.idLevel`;

      if (data.idLevel > 0) {
        query += ` AND l.idLevel = ${data.idLevel} AND s.stateUser = ${data.stateUser}`;
      }

      if (data.order) {
        if (data.nameOrLastName === "nameUser") {
          query += ` ORDER BY s.nameUser ${data.order}`;
        } else if (data.nameOrLastName === "lastNameUser") {
          query += ` ORDER BY s.lastNameUser ${data.order}`;
        } else {
          query += ` ORDER BY s.carnetUser ${data.order}`;
        }
      }

      const [user] = await pool.query(query);
      return user;

    case "userInfo":
      return;

    case "class":
      let queryClass =
        "SELECT c.idClass, h.totalTime, s.idUser, s.nameUser, s.lastNameUser, s.carnetUser, e.department, t.nameClass, c.parallel, c.stateClass FROM class c, typeClass t, user s, hours h, extension e WHERE c.idTypeClass = t.idTypeClass AND c.idHours = h.idHours AND c.idUser = s.idUser AND  s.idExtension = e.idExtension";
      if (data.idUser > 0) {
        queryClass += ` AND s.idUser = ${data.idUser}`;
      }
      if (data.idTypeClass > 0) {
        queryClass += ` AND t.idTypeClass = ${data.idTypeClass}`;
      }
      if (data.state) {
        queryClass += ` AND c.stateClass = ${data.state}`;
      }
      if (data.order) {
        queryClass += ` ORDER BY c.parallel ${data.order}`;
      }
      const [claSs] = await pool.query(queryClass);
      return claSs;

    case "assistance":
      const [assitance] = await pool.query(
        `SELECT *  FROM assistance WHERE idClass = ? AND dateAssistance BETWEEN ? AND ? ORDER BY dateAssistance ${data.order}`,
        [
          data.idClass,
          data.dateStart,
          !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd,
        ]
      );
      return assitance;

    case "qualification":
      let queryQualification = `SELECT * FROM params WHERE idClass = ${
        data.idClass
      } AND dateTest BETWEEN '${data.dateStart}' AND '${
        !data.dateEnd ? !data.dateEnd && obtainDate() : data.dateEnd
      }'`;
      if (data.noteFinish) {
        queryQualification += ` ORDER BY noteFinish`;
      } else {
        queryQualification += ` ORDER BY dateTest`;
      }
      queryQualification += ` ${data.order}`;

      const [qualification] = await pool.query(queryQualification);

      return qualification;

    case "qualificationUser":
      const [quaUser] = await pool.query(
        `SELECT t.nameClass, c.parallel, p.title, p.dateTest, q.note FROM user u, class c, params p, qualification q, typeClass t WHERE c.idClass = p.idClass AND p.idParams = q.idParams AND u.idUser = q.idUser AND c.idTypeClass = t.idTypeClass AND u.idUser = ? AND c.idClass = ?`,
        [data.idUser, data.idCourse]
      );
      return quaUser;

    case "assistanceUser":
      const [assisUser] = await pool.query(
        `SELECT t.nameClass, c.parallel, a.dateAssistance, att.assistance FROM user u, class c, typeClass t, assistance a, attendance att WHERE c.idTypeClass = t.idTypeClass AND a.idAssistance = att.idAssistance AND u.idUser = att.idUser AND u.idUser = ? AND c.idClass = ?`,
        [data.idUser, data.idCourse]
      );
      return assisUser;

    case "classList":
      // LISTA DE ESTUDIANTES CON SU ID
      let listStudents = (await allClassStudent(data.idClass)).map(
        ({ idUser }) => idUser
      );

      // LISTA CON TODAS LAS NOTAS
      let [listNotes] = await pool.query(
        `SELECT q.idUser, q.note FROM qualification q, params p, class c, user u WHERE q.idParams = p.idParams AND c.idClass = p.idClass AND u.idUser = q.idUser AND c.idClass = ?`,
        [data.idClass]
      );

      totalNote(listStudents, listNotes);
      
      // console.log(listStudents);
      // console.log(listNotes);

      return listNotes;
    // let queryClassList = `SELECT c.idClass, u.idUser, u.photoUser, u.nameUser, u.lastNameUser, u.carnetUser, e.department, s.stateStudent,
    // MAX(q.note) AS note FROM class c, student s, user u, level l, extension e, qualification q, params p
    // WHERE c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension
    // AND q.idUser = u.idUser AND p.idParams = q.idParams AND p.idClass = c.idClass AND c.idClass = ?
    // AND s.stateStudent = ? GROUP BY c.idClass, u.idUser, u.photoUser, u.nameUser, u.lastNameUser,
    // u.carnetUser, e.department, s.stateStudent ORDER BY `;
    // if (data.value === "nameUser" || data.value === "lastNameUser") {
    //   queryClassList += `u.${data.value} `;
    //   queryClassList += `${data.order}`;
    //   const [classLiss] = await pool.query(`${queryClassList}`, [
    //     data.idClass,
    //     data.state,
    //   ]);
    //   return classLiss;
    // } else if (data.value === "note") {
    //   queryClassList += `u.nameUser ${data.order}`;
    //   const [classLiss] = await pool.query(`${queryClassList}`, [
    //     data.idClass,
    //     data.state,
    //   ]);
    //   console.log(classLiss);

    //   return ":D";
    // } else return [];

    default:
      break;
  }
};

const filterData = async (search, data, page) => {
  const response = await dataSearh(search, data);
  return responseFilter(response, search, data, page);
};

module.exports = { filterData };

// MOSTRAR LISTA DE ESTUDIANTES
// SELECT c.idClass, u.idUser, u.photoUser, u.nameUser, u.lastNameUser, u.carnetUser, e.department, s.stateStudent FROM class c, student s, user u, level l, extension e WHERE c.idClass = ? AND c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension

// case "classList":
//   let queryClassList = `SELECT c.idClass, u.idUser, u.photoUser, u.nameUser, u.lastNameUser, u.carnetUser, e.department, s.stateStudent,
//     MAX(q.note) AS note FROM class c, student s, user u, level l, extension e, qualification q, params p
//     WHERE c.idClass = s.idClass AND u.idUser = s.idUser AND l.idLevel = u.idLevel AND e.idExtension = u.idExtension
//     AND q.idUser = u.idUser AND p.idParams = q.idParams AND p.idClass = c.idClass AND c.idClass = ?
//     AND s.stateStudent = ? GROUP BY c.idClass, u.idUser, u.photoUser, u.nameUser, u.lastNameUser,
//     u.carnetUser, e.department, s.stateStudent ORDER BY `;
//   if (data.value === "nameUser" || data.value === "lastNameUser") {
//     queryClassList += `u.${data.value} `;
//   } else {
//     queryClassList += `q.note `;
//   }
//   queryClassList += `${data.order}`;
//   const [classLiss] = await pool.query(`${queryClassList}`, [
//     data.idClass,
//     data.state,
//   ]);
//   return classLiss;
