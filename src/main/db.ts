const db = require('./dbLib');

// const os = require('os');
// const fs = require('fs');
// const path = require('path');
type Collections = 'words';
// type Collections='newDocuments' | 'syncedDocuments'

// function setDefaultDataPath() {
//   const userDataPath = electron.app.getPath('userData');
//   const storagePath = path.join(userDataPath, 'storage');
//   db.path(storagePath);
// }

// // Call the function to set the default data path
// setDefaultDataPath();
// console.log(db.getPath(), ' deeeeeeeee fult path');
class DB {
  constructor() {
    // db.createCollection('syncedDocuments', (success: boolean, message: string) => {
    //   if (success) {
    //     console.log(message);
    //   } else {
    //     console.log('error. ', message);
    //   }
    // });
    // db.createCollection('newDocuments', (success: boolean, message: string) => {
    //   if (success) {
    //     console.log(message);
    //   } else {
    //     console.log('error. ', message);
    //   }
    // });
    db.createCollection('words', (success: boolean, message: string) => {
      if (success) {
        console.log(message);
      } else {
        console.log('error. ', message);
      }
    });
  }
  getAll(collection: Collections): Promise<any> {
    return new Promise((resolve, reject) => {
      db.getAll(collection, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          reject(message);
        }
      });
    });
  }
  count(collection: Collections) {
    return new Promise((resolve, reject) => {
      db.count(collection, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          reject(message);
        }
      });
    });
  }
  getFieldValues(collection: Collections, key: string) {
    return new Promise((resolve, reject) => {
      db.getFieldValues(collection, key, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          reject(message);
        }
      });
    });
  }
  insertOne(collection: Collections, items: object) {
    return new Promise((resolve, reject) => {
      db.insertOne(collection, items, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          reject(message);
        }
      });
    });
  }
  insertUniqueOne(collection: Collections, items: any, uniqueBy: string | []) {
    return new Promise((resolve, reject) => {
      if (uniqueBy) {
        if (uniqueBy?.constructor === Array) {
          uniqueBy?.forEach((item) => {
            console.log(item, items?.[item], 'search array');
            db.search(
              collection,
              item,
              items?.[item],
              (success: boolean, data: any, message: string) => {
                if (success) {
                  if (data.length > 0) {
                    reject(`${item} field already exists.`);
                  } else {
                    db.insertOne(
                      collection,
                      items,
                      (success: boolean, data: any, message: string) => {
                        if (success) {
                          resolve(data);
                        } else {
                          return reject(message);
                        }
                      },
                    );
                  }
                } else {
                  reject(`Search for ${item} was not successful. ${message}`);
                }
              },
            );
          });
        } else if (typeof uniqueBy === 'string') {
          // console.log(uniqueBy, items?.[uniqueBy],'search array')

          db.search(
            collection,
            uniqueBy,
            items?.[uniqueBy],
            (success: boolean, data: any, message: string) => {
              if (success) {
                if (data.length > 0) {
                  console.log(data, 'success ****');

                  reject(`${uniqueBy} field already exists. `);
                } else {
                  db.insertOne(
                    collection,
                    items,
                    (success: boolean, data: any, message: string) => {
                      if (success) {
                        resolve(data);
                      } else {
                        return reject(message);
                      }
                    },
                  );
                }
              } else {
                reject(`Search for ${uniqueBy} was not successful. ${message}`);
              }
            },
          );
        }
      } else {
        db.insertOne(collection, items, (success: boolean, data: any, message: string) => {
          if (success) {
            resolve(data);
          } else {
            return reject(message);
          }
        });
      }
    });
  }
  insertMany(collection: Collections, items: []) {
    return new Promise((resolve, reject) => {
      db.insertMany(collection, items, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  search(collection: Collections, key: string, value: string) {
    return new Promise((resolve, reject) => {
      db.search(collection, key, value, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  searchByField(collection: Collections, key: string) {
    return new Promise((resolve, reject) => {
      db.searchByField(collection, key, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  filter(collection: Collections, conditionObj: object) {
    return new Promise((resolve, reject) => {
      db.filter(collection, conditionObj, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  updateOne(collection: Collections, where: object, newValue: object) {
    return new Promise((resolve, reject) => {
      db.updateOne(collection, where, newValue, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  updateMany(collection: Collections, where: object, newValue: object) {
    return new Promise((resolve, reject) => {
      db.updateMany(collection, where, newValue, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  deleteOne(collection: Collections, where: object) {
    return new Promise((resolve, reject) => {
      db.deleteOne(collection, where, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  deleteMany(collection: Collections, where: object) {
    return new Promise((resolve, reject) => {
      db.deleteMany(collection, where, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  clearCollection(collection: Collections) {
    return new Promise((resolve, reject) => {
      db.clearCollection(collection, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
  deleteCollection(collection: Collections) {
    return new Promise((resolve, reject) => {
      db.deleteCollection(collection, (success: boolean, data: any, message: string) => {
        if (success) {
          resolve(data);
        } else {
          return reject(message);
        }
      });
    });
  }
}

export default DB;
