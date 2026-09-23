#* ./db/dao/${Package}/${ResourceName}Dao *#

#* @vtlvariable name="PACKAGE_NAME" type="java.lang.String" *#
#* @vtlvariable name="ResourceName" type="java.lang.String" *#
#if (${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#set($DaoVariable = ${ResourceName} + "Dao")
#set($QVariable = "Q" + ${ResourceName})
#set($ResourceName_LowerCase = $ResourceName.substring(0,1).toLowerCase() + $ResourceName.substring(1))

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;

@Singleton
public class ${ResourceName}Dao extends CrudDaoQuerydsl<${ResourceName}> {

    @Inject
    private ${ResourceName}Dao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, ${QVariable}.${ResourceName_LowerCase});
    }

    public List<${ResourceName}> fetch${ResourceName}s() {
        return transactionManager.selectQuery()
            .select(${QVariable}.${ResourceName_LowerCase})
            .from(${QVariable}.${ResourceName_LowerCase})
            .fetch();
    }
}
