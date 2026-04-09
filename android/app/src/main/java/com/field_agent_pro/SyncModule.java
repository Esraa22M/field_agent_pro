package com.field_agent_pro; 
import androidx.work.ExistingWorkPolicy;
import androidx.work.OneTimeWorkRequest;
import androidx.work.WorkManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SyncModule extends ReactContextBaseJavaModule {
    
    private static ReactApplicationContext reactContext;

    SyncModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "SyncModule"; 
    }

    @ReactMethod
    public void triggerSyncNow() {
        try {
            WorkManager workManager = WorkManager.getInstance(reactContext);
            
            OneTimeWorkRequest syncRequest = new OneTimeWorkRequest.Builder(BackgroundSyncWorker.class)
                    .build();

            workManager.enqueueUniqueWork(
                "manual_sync_task",
                ExistingWorkPolicy.REPLACE,
                syncRequest
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
